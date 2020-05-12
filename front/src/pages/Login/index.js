import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

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
        alert(`Falha ao realizar login. ${error.response.data.message}`);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h2>Entrar na sua conta</h2>
          <input
            placeholder="Seu E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>

        </form>
        <div className="container-footer">
          <Link className="button-link" to="/">
            <ArrowBackIos />
            Voltar
          </Link>
          <Link className="button-link" to="/register">Não possuo Cadastro</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
