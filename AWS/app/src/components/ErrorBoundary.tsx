import React from 'react';
import '../styles/Error.css';
import { ipUrl } from './Config'; // Import the URL from the config file

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div id='error-boundary'>
          <h1>Cannot Connect to the Server</h1>
          <h3>Make sure you are connected to the LASP VPN</h3>
          <h4>LASP VPN connection is required</h4>
          <h4>
            Secure Socket Layer not yet configured. Open a new tab and enter{' '}
            <a href={ipUrl} target="_blank" rel="noopener noreferrer">
              {ipUrl}
            </a>
            . Click Advanced, and choose to proceed. This issue is temporary.
          </h4>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;