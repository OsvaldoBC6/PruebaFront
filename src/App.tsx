import miImagen from "./Documents/fondo.jpg";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import rutas from "./route-config";
import { configurarInterceptor } from "./Forms/Utils/Interceptores";
configurarInterceptor()
function App() {
  
  const ImagenFondo = {
    backgroundImage: "url(" + miImagen + ")",
    height: "1100px",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
        <div style={ImagenFondo}>
        <BrowserRouter>
        <Switch>
            {rutas.map((ruta) => (
              <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                <ruta.componente />
              </Route>
            ))}
          </Switch>
    </BrowserRouter>
     
  </div>
    
    </>
    

  );
}

export default App;
