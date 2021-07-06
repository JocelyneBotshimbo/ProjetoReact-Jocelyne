import React, { useState } from 'react';

const InserirContacts = ({ name, saveName, lastName, saveLastName, phone, savePhone, getContacts, setContacts }) => {

    const [error, salvarError] = useState(false);
    const [contatoSalvo, setContatoSalvo] = useState(false)

    const salvarDados = (e) => {
        e.preventDefault()
        if (name === '' || lastName === '' || phone === '') {
            salvarError(true)
            return;
        } else {
            salvarError(false)
            let lista = []
            for (let i = 0; i < getContacts.length; i++) {
                lista = Array.from([...getContacts])
            }
            setContacts([...lista, { id: getContacts.length + 1, nome: name, sobrenome: lastName, telefone: phone }])
            setContatoSalvo(true)
            limparInput()
            excluirAlert()
        }

    }

    const limparInput = () => {
        document.getElementById('nome').value = ''
        document.getElementById('sobrenome').value = ''
        document.getElementById('telefone').value = ''
        saveName('')
        saveLastName('')
        savePhone('')
    }

    const alertContatoInserido = () => {
        return (
            <div className="col-lg-12 mt-3 alert-add">
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Contato inserido perfeitamente!</h4>
                </div>
            </div>
        )   
    }

    const excluirAlert = () =>{
        setTimeout(() => {
            setContatoSalvo(false)
        }, 2000);
    }

    return (
        <div className="col-lg-12">
            <div className="modal fade" id="abrir-modal" tabIndex="1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Inserir Novo Contato</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={salvarDados}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            placeholder="Nome"
                                            onChange={e => saveName(e.target.value)}
                                        />

                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sobrenome"
                                            placeholder="Sobrenome"
                                            onChange={e => saveLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefone"
                                            placeholder="Numero de telefone"
                                            onChange={e => savePhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3 modal-footer">
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={limparInput}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Salvar Contato</button>
                                    </div>
                                    {(error) ?
                                        <div className="col-lg-12 mt-3">
                                            <div className="alert alert-danger">
                                                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                <strong>Error!</strong> Todos os campos sao obrigatorios
                                            </div>
                                        </div>
                                        : ''}
                                    {(contatoSalvo) ?
                                        alertContatoInserido()

                                        : ''}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default InserirContacts;