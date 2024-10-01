import React, { useState } from 'react';
import { mountShare, listDirectoryContents, unmountShare, API_URL } from './apiService';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import ErrorModal from './ErrorModal';

/**
 * Main application component for the IMPACT Data file browser.
 * 
 * This component manages the state and interactions for browsing
 * network shares, directories, and files. It includes functionality
 * for mounting/unmounting shares, navigating directories, and opening files.
 *
 * @component
 */
const App: React.FC = () => {
  /** State for the name of the share to mount */
  const [shareName, setShareName] = useState('');
  /** State for the password used to mount the share */
  const [password, setPassword] = useState('');
  /** State for the list of available directories */
  const [directories, setDirectories] = useState<string[]>([]);
  /** State for the contents of the current folder */
  const [folderContents, setFolderContents] = useState<{ name: string, type: string }[]>([]);
  /** State for the path of the current folder */
  const [currentFolder, setCurrentFolder] = useState<string>('');
  /** State for storing and displaying error messages */
  const [error, setError] = useState<string | null>(null);
  /** State for maintaining navigation history */
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  /** State for controlling the visibility of the error modal */
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  /** State for storing the current error message */
  // const [errorMessage, setErrorMessage] = useState('');

  /**
   * Handles errors by updating the error state and showing the error modal.
   * 
   * @param {unknown} error - The error to handle
   */
  const handleError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    setError(errorMessage);
    setIsErrorModalOpen(true);
    // setErrorMessage(errorMessage);
  };

  /**
   * Attempts to mount a network share with the provided name and password.
   * Updates the state with the result or displays an error if unsuccessful.
   */
  const handleMount = async () => {
    try {
      const result = await mountShare(shareName, password);
      if (result.error) {
        setError(result.error);
        setDirectories([]);
        setIsErrorModalOpen(true);
        // setErrorMessage(result.error);
      } else {
        setError(null);
        const sortedDirectories = result.sort((a: string, b: string) => a.localeCompare(b));
        setDirectories(sortedDirectories);
        setFolderContents([]);
        setCurrentFolder('');
        setPathHistory([]);
      }
    } catch (error: unknown) {
      handleError(error);
      setDirectories([]);
    }
  };

  /**
   * Handles clicking on a folder to navigate into it.
   * Updates the current folder and its contents.
   * 
   * @param {string} folderName - The name of the folder to navigate into
   */
  const handleFolderClick = async (folderName: string) => {
    try {
      const newFolderPath = currentFolder ? `${currentFolder}/${folderName}` : folderName;
      setPathHistory([...pathHistory, currentFolder]);
      const result = await listDirectoryContents(shareName, newFolderPath);
      if (result.error) {
        setError(result.error);
        setFolderContents([]);
      } else {
        setError(null);
        setFolderContents(result);
        setCurrentFolder(newFolderPath);
      }
    } catch (error: unknown) {
      handleError(error);
      setFolderContents([]);
    }
  };

  /**
   * Handles the "Back" button click to navigate to the previous folder.
   * Updates the current folder and its contents.
   */
  const handleBackClick = async () => {
    if (pathHistory.length > 0) {
      const previousPath = pathHistory.pop() || '';
      setCurrentFolder(previousPath);
      try {
        const result = await listDirectoryContents(shareName, previousPath);
        if (result.error) {
          setError(result.error);
          setFolderContents([]);
        } else {
          setError(null);
          setFolderContents(result);
          setPathHistory(pathHistory); // Update path history state
        }
      } catch (error: unknown) {
        handleError(error);
        setFolderContents([]);
      }
    }
  };

  /**
   * Handles clicking on a file to open it in a new tab.
   * 
   * @param {string} fileName - The name of the file to open
   */
  const handleFileClick = (fileName: string) => {
    const filePath = currentFolder ? `${currentFolder}/${fileName}` : fileName;
    const fileURL = `${API_URL}/files/${encodeURIComponent(shareName)}/${encodeURIComponent(filePath)}`;
    
    window.open(fileURL, '_blank');
  };

  /**
   * Attempts to unmount the current network share.
   * Resets the state if successful or displays an error if unsuccessful.
   */
  const handleUnmount = async () => {
    try {
      const result = await unmountShare(shareName);
      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
        setDirectories([]);
        setFolderContents([]);
        setCurrentFolder('');
        setPathHistory([]);
      }
    } catch (error: unknown) {
      handleError(error);
    }
  };

  /**
   * Closes the error modal.
   */
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="App">
      <h1>IMPACT Data</h1>
      <h3>LASP VPN connection required</h3>
      {directories.length === 0 && folderContents.length === 0 && (
        <>
          <input
            type="text"
            value={shareName}
            onChange={(e) => setShareName(e.target.value)}
            placeholder="Enter Share Name"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button onClick={handleMount}>Mount Share</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {directories.length > 0 && (
        <>
          <button onClick={handleUnmount}>Unmount Share</button>
          <button onClick={handleBackClick} style={{ marginLeft: '10px' }}>Back</button>
        </>
      )}

      {directories.length > 0 && !currentFolder && (
        <ul className="folder-list">
          {directories.map((dir, index) => (
            <li key={index}>
              <button className="folder-button" onClick={() => handleFolderClick(dir)}>
                <FontAwesomeIcon icon={faFolder} className="folder-icon" />
                {dir}
              </button>
            </li>
          ))}
        </ul>
      )}
      {currentFolder && (
        <>
          <h2>Contents of {currentFolder}</h2>
          <ul className="folder-contents">
            {folderContents.map((item, index) => (
              <li key={index}>
                {item.type === "directory" ? (
                  <button className="folder-button" onClick={() => handleFolderClick(item.name)}>
                    <FontAwesomeIcon icon={faFolder} className="folder-icon" />
                    {item.name}
                  </button>
                ) : (
                  <button className="file-button" onClick={() => handleFileClick(item.name)}>
                    <FontAwesomeIcon icon={faFile} className="file-icon" />
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <ErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={handleCloseErrorModal} 
      />
    </div>
  );
};

export default App;