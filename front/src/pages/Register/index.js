import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';

import { ArrowBackIos } from '@material-ui/icons';

import api from '../../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      password,
    };

    await api.post('owner', data)
      .then((response) => {
        alert(`Cadastro criado. Bem vindo(a) ${response.data.name}!`);

        localStorage.setItem('ownerId', response.data.id);
        localStorage.setItem('ownerName', response.data.name);
        history.push('/');
      }).catch((error) => {
        alert(`Erro no cadastro, tente novamente. ${error.response.data.message}`);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleRegister}>
          <h2>Cadastro</h2>

          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputMask
            placeholder="Telefone"
            mask="(99) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
        <div className="container-footer">
          <Link className="button-link" to="/login">
            <ArrowBackIos />
            Já tenho cadastro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
