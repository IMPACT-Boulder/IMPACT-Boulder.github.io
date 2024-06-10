import Page from './components/interface';
import './styles/App.css'
import Top from './components/Top';
//import ScriptStatus from './components/Rewrite';

function App() {
  return (
    <div className="App">
      <Top />
      {/* <ScriptStatus /> */}
      <Page />
    </div>
  );
}

export default App;
