import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import petPortrait from '../../assets/pet-portrait.png';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import AlertBox from '../../components/AlertBox';
import api from '../../services/api';

import './styles.css';

const Animal = (props) => {
  const ownerId = localStorage.getItem('ownerId');
  const ownerName = localStorage.getItem('ownerName');

  const history = useHistory();

  if (!ownerId) { history.push('/login'); }

  // eslint-disable-next-line react/destructuring-assignment
  const animal = props?.location?.state?.animal;

  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [info, setInfo] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [status, setStatus] = useState(0);

  const [isLoading, setIsloading] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const [file, setFile] = useState('');

  let inputPic;

  const getRef = (input) => { inputPic = input; };

  const handlePicClick = () => {
    inputPic.click();
  };

  const handleConfirmar = async (e) => {
    e.preventDefault();

    setIsloading(true);

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
      setAlertMessage(`${response.data.message}`);
      setAlertType('success');
      setAlertState(true);

      history.push('/owner/animals');
    }).catch((error) => {
      setAlertMessage(`Falha ao salvar informações. ${error?.response?.data?.message}`);
      setAlertType('error');
      setAlertState(true);
    }).finally(() =>{
      setIsloading(false);
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
                disabled={isLoading}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            <input
              placeholder="Nome"
              value={name}
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Idade"
              value={age}
              disabled={isLoading}
              onChange={(e) => setAge(e.target.value)}
            />
            <textarea
              placeholder="Informações extras"
              value={info}
              disabled={isLoading}
              onChange={(e) => setInfo(e.target.value)}
            />

            <div className="input-group">
              <input
                placeholder="Cidade"
                value={city}
                disabled={isLoading}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                placeholder="UF"
                style={{ width: 80 }}
                value={uf}
                disabled={isLoading}
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
                  disabled={isLoading}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="0">Perdido</option>
                  <option value="1">Comunicado</option>
                  <option value="2">Encontrado</option>
                </select>
              )}

            <button
              className="button"
              type="submit"
              disabled={isLoading}
            >
              Confirmar
            </button>
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
