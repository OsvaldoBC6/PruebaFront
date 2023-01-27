import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlAlumnos } from "../endpoints";
import { AlumnoDTO } from "../Model/AlumnoDTO";
import FormAlumno from "./FormAlumno";
import { becasPutGetDTO } from "../Model/BecasDTO";
import { useParams } from "react-router-dom";
import { convertirAlumnoFormData } from "./ConvertirAlumnoForm";
export default function ActualizarAlumno() { 

  const [alumno,setAlumno]= useState<AlumnoDTO>();
  const [becasputget,setbecasputget]= useState<becasPutGetDTO>();

 const {id}:any=useParams();
 
  useEffect(()=>{
    axios.get(`${urlAlumnos}/alumno/${id}`)
    .then((respuesta:AxiosResponse<becasPutGetDTO>)=>{
      const modelo: AlumnoDTO={
        id:respuesta.data.alumno.id,
        nombre: respuesta.data.alumno.nombre,
        genero: respuesta.data.alumno.genero,
        edad: respuesta.data.alumno.edad,
      }
      setAlumno(modelo);
      setbecasputget(respuesta.data);
    })
  },[]);

  async function editar(alumnoEditar:AlumnoDTO) {
    try{
      const formData=convertirAlumnoFormData(alumnoEditar)
      await axios({
        method:'put',
        url:`${urlAlumnos}/${id}`,
        data:formData,
        headers:{ "Content-Type": "multipart/form-data" }
      })
      console.log("Editado")
    }catch(error){
      console.log(error.response.data);
    }
  }
    return (
      <>
      {alumno && becasputget ? <FormAlumno
            modelo={alumno}
            onSubmit={async (valores) => {
                if (String(valores.genero)==='false'){
                    valores.genero=false
                }else if(String(valores.genero)==='true'){
                    valores.genero=true
                }
                await editar(valores);
            }}
            becasSeleccionadas={becasputget.becasSeleccionadas}
            becasNoSeleccionadas={becasputget.becasNoSeleccionadas}
          />:""}
      </>
    );
  }
  