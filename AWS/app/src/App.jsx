import './App.css';
import React from 'react';
import Page from './components/interface.tsx';

function App() {
  return (
    <div className="App">
      <h1>AWS Server Data</h1>
      <Page />
      {/* <div id='key'>
        <h2>Key:</h2>
        <p>Radius of markers are scaled 100,000,000 times larger than the actual radius.</p>
      </div> */}
    </div>
  );
}

export default App;
