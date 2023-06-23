import { BrowserRouter as Router} from 'react-router-dom';
import ConfigRoute from './ConfigRoute';
import './App.css';

function App() {
  return (
    <Router>
        <ConfigRoute />
    </Router>
  );
}

export default App;
