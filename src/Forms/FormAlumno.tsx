import { AlumnoDTO } from "../Model/AlumnoDTO";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { BecaDTO } from "../Model/BecasDTO";
import SeleccionadorMultiple, { seleccionadorMultipleModel } from "./Utils/SeleccionadorMultiple";
import { useState } from "react";
export default function FormAlumno(props: formularioAlumnoProps) {
  
  const [becasSeleccionados,setbecasSeleccionados]=useState(mapear(props.becasSeleccionadas));
  const [becasNoSeleccionados,setbecasNoSeleccionados]=useState(mapear(props.becasNoSeleccionadas));

  function mapear(arreglo:{id:number,nombre:string}[]):seleccionadorMultipleModel[]{
    
    return arreglo.map(valor=>{
      return {llave: valor.id,valor:valor.nombre}
    })

  }
    return(
    <>
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <br />
          <br />
          <Formik
            initialValues={props.modelo}
            onSubmit={(valores,acciones)=>{
              valores.becasIds=becasSeleccionados.map(valor=>valor.llave);
              props.onSubmit(valores,acciones)
            }}
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              genero: Yup.string().required("Campo requerido"),
              edad: Yup.number().required("Campo requerido"),
            })}
          >
            {(formikProps) => (
              <Form
                className="border p-3 form"
                style={{
                  backgroundColor: "#FDFDFD",
                  borderRadius: "20px",
                  opacity: "93%",
                }}
              >
              <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Nombre</label>
                        <input
                          className="form-control"
                          id="nombre"
                          {...formikProps.getFieldProps("nombre")}
                        />
                        {formikProps.touched.nombre && formikProps.errors.nombre ?(
                                                        <div>
                                                            <label>{formikProps.errors.nombre}</label>
                                                        </div>
                                                    ):null}
                      </div>
                      <div className="col">
                        <label>Genero</label>
                        <select
                          className="form-select"
                          {...formikProps.getFieldProps("genero")}
                        >
                          <option value="0">--Seleccione el Genero--</option>
                            <option key={"true"} value="true">
                              Hombre
                            </option>
                            <option key={"false"} value={"false"}>
                              Mujer
                            </option>
                        </select>
                      </div>
                      <div className="col">
                        <label>Edad</label>
                        <input
                          className="form-control"
                          id="edad"
                          {...formikProps.getFieldProps("edad")}
                        />
                         {formikProps.touched.edad && formikProps.errors.edad ?(
                                                        <div>
                                                            <label>{formikProps.errors.edad}</label>
                                                        </div>
                                                    ):null}
                      </div>
                    <div className="form-group">
                    <div className="row">
                    <label>Becas</label>
                    <SeleccionadorMultiple seleccionados={becasSeleccionados} noSeleccionados={becasNoSeleccionados}
                    onChange={(seleccionados,noSeleccionados)=>{
                      setbecasSeleccionados(seleccionados);
                      setbecasNoSeleccionados(noSeleccionados);
                    }}/>
                    </div>
                    </div>
                      <div className="col">
                        <button type="submit" className="btn btn-success">
                            Agregar
                        </button>
                      </div>
                    </div>
                  </div> 
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <br />
      <br />
    </div>
  </>
);
}
interface formularioAlumnoProps {
    modelo: AlumnoDTO;
    onSubmit(valores: AlumnoDTO, acciones: FormikHelpers<AlumnoDTO>): void;
    becasSeleccionadas:BecaDTO[];
    becasNoSeleccionadas:BecaDTO[];
  }

