import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import petPortrait from '../../assets/pet-portrait.png';
import Header from '../../components/Header';
import api from '../../services/api';

const Found = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const animal = props?.location?.state?.animal;

  const ownerName = localStorage.getItem('ownerName');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [info, setInfo] = useState('');

  const history = useHistory();

  const handleEnviar = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      info,
      animalId: animal.id,
    };

    await api.post('communique', data)
      .then((response) => {
        alert(`${response.data.message}`);

        history.push('/');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <Header ownerName={ownerName} />
      <div className="container">
        {animal && (
          <div className="info-container">
            <h1>Animal Encontrado</h1>
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

            <div className="container-footer">
              <Link className="button-link" to="/">
                <ArrowBackIos size={16} />
                Voltar
              </Link>
            </div>
          </div>
        )}
        <div className="form-container">
          <form onSubmit={handleEnviar}>
            <h2>Encontrei!</h2>
            <span>
              Passe seu contato e as informações de onde encontrou o animalzinho
              para que ele e seu dono possam se reencontrar.
            </span>
            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputMask
              placeholder="Telefone"
              mask="(99) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Informações"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Found;
