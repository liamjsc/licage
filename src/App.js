import { Helmet } from 'react-helmet'
import logo from './logo.svg';
import './App.css';
import { TopNav } from './components/index';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>cagematch</title>
      </Helmet>

      <TopNav/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          cagematch is under construction
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
