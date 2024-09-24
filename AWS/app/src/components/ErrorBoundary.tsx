import React from 'react'; // Importing React
import '../styles/Error.css'; // Importing CSS for styling the ErrorModal component
import { ipUrl } from './Config'; // Import the IP URL from the config file for VPN instructions

/**
 * Props for the ErrorModal component.
 * 
 * @interface ErrorModalProps
 * @property {boolean} isOpen - Determines if the modal should be displayed.
 * @property {function} onClose - Callback function to close the modal.
 */
interface ErrorModalProps {
  isOpen: boolean; // Boolean prop that controls whether the modal is visible
  onClose: () => void; // Function prop to handle closing the modal
}

/**
 * ErrorModal component.
 * 
 * This component renders a modal that displays an error message when the app cannot connect to the server.
 * The modal prompts the user to ensure they are connected to the LASP VPN.
 * 
 * @component
 * @param {ErrorModalProps} props - The props for the ErrorModal component.
 * @returns {JSX.Element | null} The rendered ErrorModal component, or null if the modal is not open.
 */
const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  // If the modal is not open, return null and render nothing
  if (!isOpen) return null;

  return (
    <div className="modal-overlay"> {/* Modal overlay to dim the background */}
      <div className="modal-content"> {/* Modal content container */}
        <div id='error-boundary'> {/* Main container for the error message */}
          <h1>Cannot Connect to the Server</h1>
          <h3>Make sure you are connected to the LASP VPN</h3>
          <h4>LASP VPN connection is required</h4>
          <h4>
            Secure Socket Layer not yet configured. Open a new tab and enter{' '}
            <a href={ipUrl} target="_blank" rel="noopener noreferrer"> {/* Link to the server IP */}
              {ipUrl}
            </a>
            . Click Advanced, and choose to proceed. This issue is temporary.
          </h4>
          <button onClick={onClose}>Close</button> {/* Button to close the modal */}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal; // Exporting ErrorModal component as the default export
