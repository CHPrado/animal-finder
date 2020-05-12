import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Edit, Delete, Pets } from '@material-ui/icons';

import petPortrait from '../../assets/pet-portrait.png';
import Header from '../../components/Header';
import api from '../../services/api';
import getAnimalStatus from '../../utils/getAnimalStatus';

import './styles.css';

const OwnerAnimals = () => {
  const [ownerAnimals, setOwnerAnimals] = useState([]);
  const history = useHistory();

  const ownerId = localStorage.getItem('ownerId');
  const ownerName = localStorage.getItem('ownerName');

  if (!ownerId) { history.push('/login'); }

  const handleDeleteAnimal = async (id) => {
    await api.delete(`animal/${id}`, {
      headers: {
        Authorization: ownerId,
      },
    }).then(() => {
      setOwnerAnimals(ownerAnimals.filter((animal) => animal.id !== id));
    }).catch((error) => {
      alert(`Erro ao excluir animal. ${error.response.data.message}`);
    });
  };

  useEffect(() => {
    api.get('owner-animals', {
      headers: {
        Authorization: ownerId,
      },
    }).then((response) => {
      setOwnerAnimals(response.data);
    });
  }, []);

  return (
    <>
      <Header ownerName={ownerName} />
      <div className="container">
        <div className="list-container">
          <h2>Meus pets perdidos</h2>
          {ownerAnimals.length
            ? (
              <>
                <ul>
                  { ownerAnimals.map((animal) => (
                    <>
                      <li key={animal.id}>
                        <img src={animal.picture || petPortrait} alt="Pet" />

                        <div className="input-group">
                          <div>
                            <strong>NOME:</strong>
                            <p>{animal.name}</p>
                          </div>

                          <div>
                            <strong>IDADE:</strong>
                            <p>{animal.age}</p>
                          </div>
                        </div>

                        <strong>STATUS</strong>
                        <p
                          className={getAnimalStatus(animal.status)}
                        >{getAnimalStatus(animal.status)}
                        </p>

                        <strong>INFORMAÇÕES EXTRAS</strong>
                        <p>{animal.info}</p>

                        <div className="input-group">
                          <div>
                            <strong>CIDADE (DESAPARECIMENTO)</strong>
                            <p>{animal.city}</p>
                          </div>
                          <div>
                            <strong>ESTADO (DESAPARECIMENTO)</strong>
                            <p>{animal.uf}</p>
                          </div>
                        </div>

                        <div className="container-footer">
                          <Link className="edit-animal" to={{ pathname: '/animal', state: { animal } }}>
                            <Edit size={20} />
                          </Link>
                          <button className="delete-animal" onClick={() => handleDeleteAnimal(animal.id)} type="button">
                            <Delete size={20} />
                          </button>
                        </div>
                      </li>

                      <li>
                        <h2>Comunicados</h2>
                        {animal.communiques.length
                          ? (
                            <div className="communiques-container">
                              {animal.communiques.map((communique) => (
                                <div className="communique-item">
                                  <div className="input-group">
                                    <div>
                                      <strong>Nome</strong>
                                      <p>{communique.name}</p>
                                    </div>
                                    <div>
                                      <strong>Telefone</strong>
                                      <p>{communique.phone}</p>
                                    </div>
                                    <div>
                                      <strong>INFORMAÇÕES</strong>
                                      <p>{communique.info}</p>
                                    </div>
                                  </div>

                                </div>
                              ))}
                            </div>
                          )
                          : (
                            <div className="empty">
                              <Pets />
                              <span>Nenhum comunicado</span>
                            </div>
                          )}
                      </li>
                    </>
                  ))}
                </ul>
              </>
            )
            : (
              <div className="empty">
                <Pets />
                <span>Nenhum animalzinho perdido! :)</span>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default OwnerAnimals;
