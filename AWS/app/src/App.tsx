import Page from './components/interface';
import './styles/App.css'
import Top from './components/Top';

/**
 * The main App component that renders the top section and the page interface.
 * 
 * @component
 * @returns The main application structure.
 */
function App() {
  return (
    <div className="App">
      <Top />
      <Page />
    </div>
  );
}

export default App;
