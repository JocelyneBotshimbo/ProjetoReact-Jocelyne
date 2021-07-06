import React from 'react';

const BuscarContacts = ({setBusca}) => {

    const salvarBusca = (e) => {
        e.preventDefault()
        setBusca(e.target.value)  
    }
    
    return ( 
        <div className="col-lg-4 mt-3 mb-3">
            <form className="form-search" onChange={salvarBusca}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Buscar Contato" id="campo-buscar"/>
            </form>
        </div>
    );
}
 
export default BuscarContacts;