import { useEffect, useState } from "react";
import { AlumnoDTO } from "../Model/AlumnoDTO";
import  axios ,{AxiosResponse} from "axios";
import { urlAlumnos, urlListaAlumnos, urlListaBecas } from "../endpoints";
import { BecaDTO } from "../Model/BecasDTO";

export default function ListaAlumnos(){
    const [alumnos, setalumnos] = useState<AlumnoDTO[]>();
    const [becas,setBecas]=useState<BecaDTO[]>();

    useEffect(() => {
        ListaGeneral();
        axios.get(urlListaBecas)
        .then((respuesta:AxiosResponse<BecaDTO[]>)=>{
            setBecas(respuesta.data)
        })
      }, []);

     function ListaGeneral() {
        axios.get(urlListaAlumnos)
        .then((respuesta:AxiosResponse<AlumnoDTO[]>)=>{
            setalumnos(respuesta.data)
        })
      }

      async function borrar(id?: number) {
        try {
          await axios.delete(`${urlAlumnos}/${id}`);
          console.log("Eliminado")
        } catch (error) {
            console.log(error.response.data);
        }
      }
    
      function filtrar(id:number) {
        if (id !==0){
            axios.get(`${urlAlumnos}/alumnosFiltroBeca/${id}`)
        .then((respuesta:AxiosResponse<AlumnoDTO[]>)=>{
            setalumnos(respuesta.data)
        })
        }else{
            ListaGeneral();
        }
      }

      function filtrarBecados(id:number) {
        if (id !==0){
            axios.get(`${urlAlumnos}/alumnosBecados/${id}`)
        .then((respuesta:AxiosResponse<AlumnoDTO[]>)=>{
            setalumnos(respuesta.data)
        })
        }else{
            ListaGeneral();
        }
      }

    return(
        <>
        <div className="container">
        <div className="row justify-content-center">

            <div className="col-md-8">
            <a
                href={`/alumno/agregar`}
            >
            <button
                type="button"
                className="btn btn-primary"
            >
            Agregar
            </button>
            </a>
            <br/><br/>
            <label>Tipo de beca</label>
            <select className="form-select" onChange={(e)=>filtrar(Number(e.target.value))}>
                <option value="0">--Filtrar--</option>
                          {becas?.map((beca) => (
                            <option key={beca.id} value={beca.id}>
                              {beca.nombre}
                            </option>
                          ))}
            </select>

            <label>Beca</label>
            <select className="form-select" onChange={(e)=>filtrarBecados(Number(e.target.value))}>
                <option value="0">--Filtrar--</option>
                            <option key={1} value={1}>
                                Becado
                            </option>
                            <option key={2} value={2}>
                                No Becado
                            </option>
            </select>
        
            <div className="form-group">
                            <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Genero</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {alumnos?.map((alum) => (
                                <tr key={alum.id}>
                                    <td>{alum.nombre}</td>
                                    <td>{alum.genero === true ? "Hombre" : "Mujer" }</td>
                                    <td>{alum.edad}</td>
                                    <td>
                                    <a
                                        href={`/alumno/editar/${alum.id}`}
                                    >
                                        <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        >
                                        Editar
                                        </button>
                                    </a>
                                        <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={()=>borrar(alum.id)}
                                        >
                                        Eliminar
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                </div>
            </div>
      </div>
      </div>
    </>
    )
}