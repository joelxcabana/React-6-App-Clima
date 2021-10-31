import React,{useState} from 'react';
import PropTypes from 'prop-types';

const Formulario = ({busqueda,setBusqueda,setConsultar}) => {

    const [error,setError] = useState(false);

    //extraer ciudad y pais
    const { ciudad, pais } = busqueda;

    //funcion que coloca lo elemento en el state
    const handleChange = e =>{
        //actualizar state
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    //cuando envia el form
    const handleSubmit = e => {
        e.preventDefault();

        //validar
         if(ciudad.trim() === '' || pais.trim() === '' ){
             setError(true);
             return;
         }
         setError(false)
        //pasar componente principal
        setConsultar(true);
    }

    return ( 
        <form 
        onSubmit={handleSubmit}>
            {error ? <p className="red darken-4 error">Todos los campos son obligatorios</p>: null}
            <div className="input-field col s12">
                <input
                 type="text"
                 name="ciudad"
                 id="ciudad"
                 value={ciudad}
                 onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad :</label>
            </div>
            <div className="input-field col s12">
                <select
                 name="pais"
                 id="pais"
                 value={pais}
                 onChange={handleChange}
                 >
                <option value="">--- Seleccione un pais ---</option>
                <option value="US">Estados Unidos</option>
                <option value="MX">México</option>
                <option value="AR">Argentina</option>
                <option value="CO">Colombia</option>
                <option value="CR">Costa Rica</option>
                <option value="ES">España</option>
                <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">Pais :</label>
            </div>
            <div className="input-field col s12">
                <input
                 type="submit"
                 value="Buscar Clima"
                 className="waves-effect waves-light btn-large btn-block yellow accent-4 "
                />
            </div>
        </form>
     );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda:PropTypes.func.isRequired,
    setConsultar:PropTypes.func.isRequired
}
 
export default Formulario;