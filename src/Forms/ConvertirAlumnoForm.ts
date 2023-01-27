import { AlumnoDTO } from "../Model/AlumnoDTO";
export function convertirAlumnoFormData(alumno:AlumnoDTO):FormData{
    const formData= new FormData();
    formData.append('id',String(alumno.id));
    formData.append('nombre',String(alumno.nombre));
    formData.append('genero',String(alumno.genero));
    formData.append('edad',String(alumno.edad));
    formData.append('becasIds',JSON.stringify(alumno.becasIds));
    return formData;
}
