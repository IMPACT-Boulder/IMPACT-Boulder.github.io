import React from 'react';
import { API_URL } from './apiService';

/**
 * Props for the ErrorModal component.
 *
 * @interface ErrorModalProps
 * @property {boolean} isOpen - Determines if the modal should be displayed.
 * @property {() => void} onClose - Callback function to close the modal.
 */
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ErrorModal component.
 *
 * This component renders a modal that displays an error message when the app cannot connect to the server.
 * It provides information about the LASP VPN requirement and instructions for handling SSL configuration issues.
 *
 * @component
 * @param {ErrorModalProps} props - The props for the ErrorModal component.
 * @returns {JSX.Element | null} The rendered ErrorModal component, or null if the modal is not open.
 */
const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  // If the modal is not open, return null and render nothing
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div id="error-boundary">
          <h1>Cannot Connect to the Server</h1>
          <h3>Make sure you are connected to the LASP VPN</h3>
          <h4>LASP VPN connection is required</h4>
          <h4>
            Secure Socket Layer not yet configured. Open a new tab and enter{' '}
            {/* Link to the server API URL */}
            <a href={API_URL} target="_blank" rel="noopener noreferrer">
              {API_URL}
            </a>
            . Click Advanced, and choose to proceed.
          </h4>
          {/* Button to close the modal */}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;