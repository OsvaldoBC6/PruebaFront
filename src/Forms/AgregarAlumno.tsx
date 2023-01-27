import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlAgregarAlumno, urlListaBecas } from "../endpoints";
import { AlumnoDTO } from "../Model/AlumnoDTO";
import { BecaDTO } from "../Model/BecasDTO";
import { convertirAlumnoFormData } from "./ConvertirAlumnoForm";
import FormAlumno from "./FormAlumno";

export default function AgregarAlumno() { 

  const [becaNoSeleccionada, setBecaNoSeleccionada] = useState<BecaDTO[]>([]);
  const [cargando,setCargando]=useState(false)

  useEffect(() => {
    axios.get(urlListaBecas)
    .then((respuesta:AxiosResponse<BecaDTO[]>)=>{
        setBecaNoSeleccionada(respuesta.data)
        setCargando(true)
    })
  }, []);

    async function crear(alumno: AlumnoDTO) {
      try {
        const formData =convertirAlumnoFormData(alumno);
        await axios({
          method: "post",
          url: urlAgregarAlumno,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
       console.log("Insertado")
      } catch (error) {
        console.log(error.response.data);
      }
    }
    
    return (
      <>
      {cargando ?  <FormAlumno
          modelo={{
            id:0,
            nombre:"",
            genero:false,
            edad:0
          }}
          onSubmit={async (valores) => {
            console.log(Number(valores.edad))
            if (Number(valores.edad)<15 || Number(valores.edad)>18){
              console.log("Edad Incorrecta")
            }else{
              await crear(valores);
            }
          }}
          becasSeleccionadas={[]}
          becasNoSeleccionadas={becaNoSeleccionada}
        />:""}
       
      </>
    );
  }
  