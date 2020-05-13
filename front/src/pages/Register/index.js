import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import api from '../../services/api';
import Loader from '../../components/Loader';
import AlertBox from '../../components/AlertBox';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsloading] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsloading(true);

    const data = {
      name,
      email,
      phone,
      password,
    };

    await api.post('owner', data)
      .then((response) => {
        localStorage.setItem('ownerId', response.data.id);
        localStorage.setItem('ownerName', response.data.name);
        history.push('/');
      }).catch((error) => {
        setAlertMessage(`Erro no cadastro, tente novamente. ${error?.response?.data?.message}`);
        setAlertType('error');
        setAlertState(true);
      }).finally(() =>{
        setIsloading(false);
      });
  };

  const handleCloseAlert = () => {
    setAlertState(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <AlertBox
        type={alertType}
        open={alertState}
        close={handleCloseAlert}
        message={alertMessage}
      />
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <h2>Cadastro</h2>

            <input
              placeholder="Nome"
              value={name}
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputMask
              placeholder="Telefone"
              mask="(99) 99999-9999"
              value={phone}
              disabled={isLoading}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              placeholder="Senha"
              value={password}
              type="password"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </form>
          <div className="container-footer">
            <Link className="button-link" to="/login" disabled={isLoading}>
              <ArrowBackIos />
              Já tenho cadastro
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
