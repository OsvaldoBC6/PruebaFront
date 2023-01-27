import ActualizarAlumno from "./Forms/ActualizarAlumno";
import AgregarAlumno from "./Forms/AgregarAlumno";
import ListaAlumnos from "./Forms/ListaAlumnos";

const rutas=[
    {path:'/',componente:ListaAlumnos,exact:true},
    {path:'/alumno/agregar',componente:AgregarAlumno},
    {path:'/alumno/editar/:id(\\d+)',componente:ActualizarAlumno},     
];
export default rutas;