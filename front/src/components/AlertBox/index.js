import React from 'react';

import {
  CheckCircleOutline, ErrorOutline, InfoOutlined, ReportProblemOutlined,
} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

import './styles.css';

const AlertBox = ({
  type = 'info', message, open, close,
}) => {
  const hidden = open ? 'show' : 'hide';
  const infoIcon = (type === 'info' && (<InfoOutlined />))
                   || (type === 'warn' && (<ReportProblemOutlined />))
                   || (type === 'success' && (<CheckCircleOutline />))
                   || (type === 'error' && (<ErrorOutline />));

  const handleClose = () => {
    close();
  };

  return (
    <div className={`alert-container ${hidden}`}>
      <div className={`alert-box ${type}`}>
        <div className="alert-icon">
          {infoIcon}
        </div>
        <div className="alert-message">
          <strong>{message}</strong>
        </div>
        <div
          className={`alert-close ${type}`}
          role="button"
          onClick={handleClose}
          onKeyDown={handleClose}
          tabIndex={0}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
