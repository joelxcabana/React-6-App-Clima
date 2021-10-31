import React,{Fragment,useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

    //state del formulario
  const [busqueda,setBusqueda] = useState({
      ciudad:'',
      pais:''
  });

  const [consultar,setConsultar] = useState(false);

  const[resultado, setResultado] = useState({});
    const [error,setError] = useState(false);
  const { ciudad , pais } = busqueda;

  useEffect(() => {
    const consultarApi = async() => {

       if(consultar){
        const appId = "bed3b5f95af7418c89a19ba649153703";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        setResultado(resultado);
        setConsultar(false);

        //detecta si hubo resultados correctos
        if(resultado.cod === "404"){
          setError(true);
        }else{
          setError(false);
        }
       }
    }
    consultarApi();
    // eslint-disable-next-line
  }, [consultar])

  let componente;
  if(error){
    componente = <Error mensaje="No hay Resultado"/>
  }else{
    componente = <Clima resultado={resultado}/>
  }

  return (
  <Fragment>
    <Header
     titulo="Clima React App"
    >
    </Header>
    <div className="contenedor-form">
      <div className="container">
        <div className="row">
          <div className="col m6 s12">
                <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
                />
          </div> 
          <div className="col m6 s12">
              {componente}
          </div>
        </div>
      </div>

    </div>
  </Fragment>
 
  );
}

export default App;
