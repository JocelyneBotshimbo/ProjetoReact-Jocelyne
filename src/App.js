import React, { Fragment, useState, useEffect } from 'react'

import Header from './componentes/Header'
import BuscarContacts from './componentes/BuscarContacts'
import RepetirContacts from './componentes/RepetirContacts'
import InserirContacts from './componentes/InserirContacts'
import EditarContacts from './componentes/EditarContacts'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {

  const [name, saveName] = useState('')
  const [lastName, saveLastName] = useState('')
  const [phone, savePhone] = useState('')

  const [getId, setId] = useState()

  const [getContacts, setContacts] = useState([])

  const [getBusca, setBusca] = useState([])


  useEffect (() => {
    setContacts(getBusca)
  },[])


  const excluir = (contato) => {
    confirmAlert({
      title: 'Confirmar',
      message: 'Tem certeza que quer excluir este contato?',
      buttons: [
        {
          label: 'SIM',
          onClick: () => {
            let cont = 0;
            let arranjo = getContacts
            arranjo.forEach((registro) => {
              if (contato.id === registro.id) {
                arranjo.splice(cont, 1);
              }
              cont++;
            });

            let lista = []
            for (let i = 0; i < arranjo.length; i++) {
              lista = Array.from([...arranjo])
            }
            setContacts([...lista])
          }
        },
        {
          label: 'NAO',
        }
      ]
    });

  }

  const editar = (id) => {
    setId(id)
    let cont = 0;
    let newArrayContacts = getContacts
    newArrayContacts.forEach((registro) => {
      if (id === registro.id) {
        saveName(newArrayContacts[cont].nome)
        saveLastName(newArrayContacts[cont].sobrenome)
        savePhone(newArrayContacts[cont].telefone)
      }
      cont++;
    });

  }

  const mostrarContacts = () => {
    let listaContacts = []

    if (getBusca.length > 0) {
      listaContacts = getContacts.filter(busca => {
        if (busca.nome.toLowerCase() === getBusca.toLowerCase()
          || busca.sobrenome.toLowerCase() === getBusca.toLowerCase()
          || (busca.nome.toLowerCase() + ' ' + busca.sobrenome.toLowerCase()) === getBusca.toLowerCase()
          || busca.telefone === getBusca
          || busca.telefone.replace('+', '') === getBusca
          || busca.id === getBusca) {
          return busca
        }
      });

    } else {
      listaContacts = getContacts
    }

    if (getBusca.length > 0 && listaContacts.length === 0) {
      return (
        <tr key={0}>
          <td colspan={6} className="busca-invalida"> Nenhum contato foi encontrado que corresponda à sua pesquisa !</td>
        </tr>
      )
    } else {
      return listaContacts.map(contato => (
        <tr key={contato.id}>
          <th scope="row">{contato.id}</th>
          <td>{contato.nome}</td>
          <td>{contato.sobrenome}</td>
          <td>{contato.telefone}</td>
          <td>
            <a href="" className="btn-editar" id="editar" onClick={(e) => {
              e.preventDefault()
              editar(contato.id)
            }} data-toggle="modal" data-target="#abrir-modal-editar">
              <i className="far fa-edit mr-1"></i>Editar</a>
          </td>
          <td>
            <a href="" className="btn-excluir" id="excluir" onClick={(e) => {
              e.preventDefault()
              excluir(contato)
            }}>
              <i className="fas fa-trash-alt mr-1"></i>Excluir</a>
          </td>
        </tr>
      ))
    }
  }

  return (
    <Fragment>
      <Header />
      <section className="container mt-4">
        <div className="row justify-content-between mt-4">
          <BuscarContacts
            setBusca={setBusca}
          />
          <RepetirContacts />
          <div className="col-lg-12 mt-3 mb-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Sobrenome</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {getContacts.length > 0 ? mostrarContacts() :
                  <tr key={0}>
                    <td colspan={6} className="lista-vacia"> Você não adicionou nenhum contato!</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <InserirContacts
            name={name}
            saveName={saveName}
            lastName={lastName}
            saveLastName={saveLastName}
            phone={phone}
            savePhone={savePhone}
            getContacts={getContacts}
            setContacts={setContacts}
          />
        </div>
        <EditarContacts
          name={name}
          saveName={saveName}
          lastName={lastName}
          saveLastName={saveLastName}
          phone={phone}
          savePhone={savePhone}
          getContacts={getContacts}
          setContacts={setContacts}
          id={getId}
          setId={setId}
        />
      </section>
    </Fragment>
  );
}

export default App;
