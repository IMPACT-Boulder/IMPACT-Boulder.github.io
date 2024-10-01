// src/apiService.ts

export const API_URL = 'https://10.247.29.41:5000';

export const mountShare = async (shareName: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/mount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ share_name: shareName, password: password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error mounting share:', error);
    throw error;
  }
};

export const listDirectoryContents = async (shareName: string, directoryPath: string) => {
  try {
    const response = await fetch(`${API_URL}/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ share_name: shareName, directory_path: directoryPath }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing directory contents:', error);
    throw error;
  }
};

export const unmountShare = async (shareName: string) => {
  try {
    const response = await fetch(`${API_URL}/unmount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ share_name: shareName }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error unmounting share:', error);
    throw error;
  }
};

export const searchFilesAndFolders = async (shareName: string, searchQuery: string) => {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ share_name: shareName, search_query: searchQuery }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching files and folders:', error);
    throw error;
  }
};
