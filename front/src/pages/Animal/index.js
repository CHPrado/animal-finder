import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import petPortrait from '../../assets/pet-portrait.png';
import Header from '../../components/Header';
import api from '../../services/api';

import './styles.css';

const Animal = (props) => {
  const ownerId = localStorage.getItem('ownerId');
  const ownerName = localStorage.getItem('ownerName');

  const history = useHistory();

  if (!ownerId) { history.push('/login'); }

  // eslint-disable-next-line react/destructuring-assignment
  const animal = props?.location?.state?.animal;
  // const animal = undefined;

  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [info, setInfo] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [status, setStatus] = useState(0);

  const [file, setFile] = useState('');

  let inputPic;

  const getRef = (input) => { inputPic = input; };

  const handlePicClick = () => {
    inputPic.click();
  };

  const handleConfirmar = async (e) => {
    e.preventDefault();

    const data = {
      picture,
      name,
      age,
      info,
      city,
      uf,
      status,
    };

    const route = !animal ? 'animal' : `animal/${animal.id}`;

    await api.post(route, data, {
      headers: {
        Authorization: ownerId,
      },
    }).then((response) => {
      alert(`${response.data.message}`);

      history.push('/owner/animals');
    }).catch((error) => {
      alert(`Falha ao salvar informações. ${error.response.data.message}`);
    });
  };

  useEffect(() => {
    if (animal) {
      setPicture(animal.picture);
      setName(animal.name);
      setAge(animal.age);
      setInfo(animal.info);
      setCity(animal.city);
      setUf(animal.uf);
      setStatus(animal.status);
    }
  }, []);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setPicture(event.target.result);
      };
    }
  }, [file]);

  return (
    <>
      <Header ownerName={ownerName} />
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleConfirmar}>
            <h2>Animal perdido</h2>
            <span>
              Preencha as informações necessárias para que possamos ajudar
              a encontrar seu animalzinho.
            </span>

            <div
              className="pet-portrait"
              onClick={handlePicClick}
              onKeyDown={handlePicClick}
              role="button"
              tabIndex={0}
            >
              <strong>Adicione uma Foto</strong>
              <img src={picture || petPortrait} alt="Pet" />

              <input
                hidden
                type="file"
                accept="image/*"
                ref={getRef}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Idade"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <textarea
              placeholder="Informações extras"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />

            <div className="input-group">
              <input
                placeholder="Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                placeholder="UF"
                style={{ width: 80 }}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </div>

            {!animal
              ? (
                <div>
                  <h2>Status:</h2>
                  <p className="Perdido">Perdido</p>
                </div>
              )
              : (
                <select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="0">Perdido</option>
                  <option value="1">Comunicado</option>
                  <option value="2">Encontrado</option>
                </select>
              )}

            <button className="button" type="submit">Confirmar</button>
          </form>
          <div className="container-footer">
            <Link className="button-link" to="/owner/animals">
              <ArrowBackIos />
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animal;
