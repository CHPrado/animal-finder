import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Home } from '@material-ui/icons';

import './styles.css';

const Header = ({ ownerName }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <header>
      <div className="home">
        <Link to="/"><Home /></Link>
      </div>
      {ownerName
        ? (
          <>
            <div className="loggedIn">
              <span>Olá, {ownerName}</span>
              <Link to="/owner/animals">Meus pets</Link>
              <Link to="/animal">Cadastrar animal perdido</Link>
            </div>
            <div className="logOut">
              <button onClick={handleLogout} type="button">
                Fazer Logout
              </button>
            </div>
          </>
        )
        : (
          <div className="loggedOut">
            <Link className="login" to="/login">Login</Link> ou
            <Link className="register" to="/register">Cadastrar</Link>
          </div>
        )}
    </header>
  );
};

export default Header;
