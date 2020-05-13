import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Edit, Delete, Pets } from '@material-ui/icons';

import petPortrait from '../../assets/pet-portrait.png';
import Header from '../../components/Header';
import api from '../../services/api';
import getAnimalStatus from '../../utils';

import './styles.css';
import Loader from '../../components/Loader';
import AlertBox from '../../components/AlertBox';

const OwnerAnimals = () => {
  const [ownerAnimals, setOwnerAnimals] = useState([]);
  const history = useHistory();

  const ownerId = localStorage.getItem('ownerId');
  const ownerName = localStorage.getItem('ownerName');

  const [isLoading, setIsloading] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  if (!ownerId) { history.push('/login'); }

  const handleDeleteAnimal = async (id) => {
    setIsloading(true);

    await api.delete(`animal/${id}`, {
      headers: {
        Authorization: ownerId,
      },
    }).then(() => {
      setOwnerAnimals(ownerAnimals.filter((animal) => animal.id !== id));
    }).catch((error) => {
      setAlertMessage(`Erro ao excluir animal. ${error?.response?.data?.message}`);
      setAlertType('error');
      setAlertState(true);
    }).finally(() =>{
      setIsloading(false);
    });
  };

  const getOwnerAnimals = async () => {
    setIsloading(true);

    await api.get('owner-animals', {
      headers: {
        Authorization: ownerId,
      },
    }).then((response) => {
      setOwnerAnimals(response.data);
    }).catch(() => {
      setAlertMessage('Falha ao conectar com o servidor.');
      setAlertType('error');
      setAlertState(true);
    }).finally(() => {
      setIsloading(false);
    });
  }

  useEffect(() => {
    getOwnerAnimals();
  }, []);

  const handleCloseAlert = () => {
    setAlertState(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header ownerName={ownerName} />
      <AlertBox
        type={alertType}
        open={alertState}
        close={handleCloseAlert}
        message={alertMessage}
      />
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
                          <Link
                            className="edit-animal"
                            to={{ pathname: '/animal', state: { animal } }}
                            disabled={isLoading}
                          >
                            <Edit size={20} />
                          </Link>
                          <button
                            className="delete-animal"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleDeleteAnimal(animal.id)}
                          >
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
