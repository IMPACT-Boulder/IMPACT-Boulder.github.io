// src/App.tsx

import React, { useState } from 'react';
import { mountShare, listDirectoryContents, unmountShare, searchFilesAndFolders, API_URL } from './apiService';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const [shareName, setShareName] = useState('');
  const [password, setPassword] = useState('');
  const [directories, setDirectories] = useState<string[]>([]);
  const [folderContents, setFolderContents] = useState<{ name: string, type: string }[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string, path: string, type: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMount = async () => {
    try {
      const result = await mountShare(shareName, password);
      if (result.error) {
        setError(result.error);
        setDirectories([]);
      } else {
        setError(null);
        const sortedDirectories = result.sort((a: string, b: string) => a.localeCompare(b));
        setDirectories(sortedDirectories);
        setFolderContents([]);
        setCurrentFolder('');
        setPathHistory([]);
      }
    } catch (error) {
      setError(`An error occurred while mounting the share: ${error.message}`);
      setDirectories([]);
    }
  };

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
        setShowDropdown(false);
      }
    } catch (error) {
      setError(`An error occurred while fetching the folder contents: ${error.message}`);
      setFolderContents([]);
    }
  };

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
      } catch (error) {
        setError(`An error occurred while fetching the folder contents: ${error.message}`);
        setFolderContents([]);
      }
    }
  };

  const handleFileClick = (fileName: string) => {
    const filePath = currentFolder ? `${currentFolder}/${fileName}` : fileName;
    const fileURL = `${API_URL}/files/${encodeURIComponent(shareName)}/${encodeURIComponent(filePath)}`;
    
    window.open(fileURL, '_blank');
  };

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
        setSearchResults([]);
        setSearchQuery('');
        setShowDropdown(false);
      }
    } catch (error) {
      setError(`An error occurred while unmounting the share: ${error.message}`);
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    if (e.target.value) {
      try {
        const results = await searchFilesAndFolders(shareName, e.target.value);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error searching files and folders:', error);
      }
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: { name: string, path: string, type: string }) => {
    if (result.type === 'directory') {
      handleFolderClick(result.path);
    } else {
      handleFileClick(result.path);
    }
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="App">
      <h1>IMPACT Data</h1>
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
      
      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search files and folders..."
        className="search-bar"
      />

      {/* Search results dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <ul className="search-results-dropdown">
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => handleSearchResultClick(result)}>
              <FontAwesomeIcon icon={result.type === 'directory' ? faFolder : faFile} className="search-icon" />
              {result.name}
            </li>
          ))}
        </ul>
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
    </div>
  );
};

export default App;
