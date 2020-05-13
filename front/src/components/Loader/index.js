import React from 'react';

import './styles.css';

const Loader = () => (
  <div className="loading">
    <div className="loader-container">
      <h1>Aguarde</h1>
      <div className="loader" />
    </div>
    <div className="loading-bg" />
  </div>
);

export default Loader;
