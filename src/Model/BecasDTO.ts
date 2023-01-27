import { AlumnoDTO } from "./AlumnoDTO";

export interface BecaDTO{
    id:number;
    nombre: string;
  }

  export interface becasPutGetDTO{
    alumno:AlumnoDTO;
    becasSeleccionadas:BecaDTO[];
    becasNoSeleccionadas:BecaDTO[];
  }