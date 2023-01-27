
import './selectorMultiple.css';
export default function SeleccionadorMultiple(props: seleccionadorMultipleProps){
    function seleccionar(item:seleccionadorMultipleModel){
       
        const seleccionados=[...props.seleccionados,item];
        const noSeleccionados=props.noSeleccionados.filter(valor=>valor !==item);
        if (seleccionados.length<3){
            if(item.valor==="Educativa"){
                if(seleccionados.length-1===0){
                    console.log("No puedes Agregar Esta beca")
                }else{
                    props.onChange(seleccionados,noSeleccionados);
                }
            }else{
                props.onChange(seleccionados,noSeleccionados);
            }
        }else{
            console.log("No puedes Agregar Esta beca")
        }
        
       
    }
    function deseleccionar(item:seleccionadorMultipleModel){
        const seleccionados=props.seleccionados.filter(valor=>valor !==item);
        const noSeleccionados=[...props.noSeleccionados,item];
        props.onChange(seleccionados,noSeleccionados);
    }
    return(
        <div className="selector-multiple">
            <ul>
                {props.noSeleccionados.map(item=>
                    <li key={item.llave} onClick={()=>seleccionar(item)}>{item.valor}</li>)}
            </ul>
            <ul>
                {props.seleccionados.map(item=>
                    <li key={item.llave} onClick={()=>deseleccionar(item)}>{item.valor}</li>)}
            </ul>
        </div>
    )
}
interface seleccionadorMultipleProps{
    seleccionados:seleccionadorMultipleModel[];
    noSeleccionados:seleccionadorMultipleModel[];
    onChange(seleccionados:seleccionadorMultipleModel[],noSeleccionados:seleccionadorMultipleModel[]):void;

}
export interface seleccionadorMultipleModel{
    llave:number;
    valor:string;
}