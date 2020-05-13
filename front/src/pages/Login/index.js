import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import api from '../../services/api';
import Loader from '../../components/Loader';
import AlertBox from '../../components/AlertBox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsloading] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsloading(true);

    const data = {
      email,
      password,
    };

    await api.post('login', data)
      .then((response) => {
        localStorage.setItem('ownerId', response.data.id);
        localStorage.setItem('ownerName', response.data.name);

        history.push('/');
      })
      .catch((error) => {
        setAlertMessage(`Falha ao realizar login. ${error?.response?.data?.message}`);
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
          <form onSubmit={handleLogin}>
            <h2>Entrar na sua conta</h2>
            <input
              placeholder="Seu E-Mail"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>Entrar</button>

          </form>
          <div className="container-footer">
            <Link className="button-link" to="/" disabled={isLoading}>
              <ArrowBackIos />
              Voltar
            </Link>
            <Link
              className="button-link"
              to="/register"
              disabled={isLoading}
            >
              Não possuo Cadastro
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
