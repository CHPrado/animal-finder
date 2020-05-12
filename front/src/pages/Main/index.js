import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Pets } from '@material-ui/icons';

import petPortrait from '../../assets/pet-portrait.png';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import api from '../../services/api';
import getAnimalStatus from '../../utils/getAnimalStatus';

const Main = () => {
  const [animals, setAnimals] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1);

  const ownerName = localStorage.getItem('ownerName');

  const loadAnimals = async () => {
    await api.get('animal', { params: { page } })
      .then((response) => {
        setAnimals(response.data);
        setLastPage(response.headers['x-total-pages']);
      });
  };

  useEffect(() => {
    loadAnimals();
  }, [page]);

  return (
    <>
      <Header ownerName={ownerName} />
      <div className="container">
        <div className="list-container">
          {animals.length
            ? (
              <>
                <h2>Pets perdidos</h2>
                <span>
                  Se você viu algum desses animaizinhos por aí clique em
                  <strong> Encontrei </strong>
                  e informe seu dono para que possam se reencontrar!
                </span>
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
                <ul>
                  { animals.map((animal) => (
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

                      <strong>DONO</strong>
                      <p>{animal.ownerName}</p>

                      <div className="input-group">
                        <div>
                          <strong>EMAIL</strong>
                          <p>{animal.email}</p>
                        </div>
                        <div>
                          <strong>TELEFONE</strong>
                          <p>{animal.phone}</p>
                        </div>
                      </div>

                      <Link className="encontrei" to={{ pathname: '/found', state: { animal } }}>
                        Encontrei!
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
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

export default Main;
