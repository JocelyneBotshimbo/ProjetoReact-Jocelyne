import React from 'react';


const RepetirContacts = () => {
    return (
        <div className="col-lg-3 mt-3 mb-3">
            <div className="inserir-contato">
                <a href="#" className="btn-inserir" data-toggle="modal" data-target="#abrir-modal">
                    <i className="fas fa-plus-circle pr-2"></i>
                    Inserir Novo Contato
                </a>
            </div>
        </div>
    );
}

export default RepetirContacts;