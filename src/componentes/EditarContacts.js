import React, { useState } from 'react';

const EditarContacts = ({ name, saveName, lastName, saveLastName, phone, savePhone, getContacts, setContacts, id, setId }) => {

    const [error, salvarError] = useState(false);
    const [contatoEditado, setContatoEditado] = useState(false)

    const dadosContatoEditar = {
        nome: name,
        sobrenome: lastName,
        telefone: phone
    }

    const salvarDados = (e) => {
        e.preventDefault()
        if (dadosContatoEditar.nome === '' || dadosContatoEditar.sobrenome === '' || dadosContatoEditar.telefone === '') {
            salvarError(true)
            return;
        } else {
            salvarError(false)
            let cont = 0;
            let contatoEditar = getContacts
            contatoEditar.forEach((dadosContato) => {
                if (id === dadosContato.id) {
                    contatoEditar[cont].nome = name
                    contatoEditar[cont].sobrenome = lastName
                    contatoEditar[cont].telefone = phone
                }
                cont++;
            });

            let listaContatoEditado = []
            for (let i = 0; i < contatoEditar.length; i++) {
                listaContatoEditado = Array.from([...contatoEditar])
            }           
            setContacts([...listaContatoEditado])
            setContatoEditado(true)
            excluirAlert()
            
        }
    }

    const limpar = () => {
        document.getElementById('nome').value = ''
        document.getElementById('sobrenome').value = ''
        document.getElementById('telefone').value = ''
        saveName('')
        saveLastName('')
        savePhone('')
        setId(undefined)
    }

    const alertContatoEditado = () => {
        return (
            <div className="col-lg-12 mt-3 alert-add">
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Contato editado perfeitamente!</h4>
                </div>
            </div>
        )   
    }

    const excluirAlert = () =>{
        setTimeout(() => {
            setContatoEditado(false)
        }, 2000);
    }


    return (
        <div className="col-lg-12">
            <div className="modal fade" id="abrir-modal-editar" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Editar Contato</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={limpar}>
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
                                            id="nome-edi"
                                            value={dadosContatoEditar.nome}
                                            placeholder="Nome"
                                            onChange={e => saveName(e.target.value)}
                                        />

                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sobrenome-edi"
                                            value={dadosContatoEditar.sobrenome}
                                            placeholder="Sobrenome"
                                            onChange={e => saveLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefone-edi"
                                            value={dadosContatoEditar.telefone}
                                            placeholder="Telefone"
                                            onChange={e => savePhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3 modal-footer">
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={limpar}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary editar">Editar Contato</button>
                                    </div>
                                    {(error) ?
                                        <div className="col-lg-12 mt-3">
                                            <div className="alert alert-danger">
                                                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                <strong>Error!</strong> Todos os campos sao obrigatorios
                                            </div>
                                        </div>
                                        : ''}
                                    {(contatoEditado) ?
                                        alertContatoEditado()

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

export default EditarContacts;