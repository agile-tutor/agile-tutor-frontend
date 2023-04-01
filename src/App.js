import { Provider } from './context/Provider.js';
import { BrowserRouter as Router } from "react-router-dom";
import { AttendanceRoutes } from './routes.js';
import './App.css';
import NavBar from './components/NavBar.js';

const App = () => {

  return (
    <Provider>
      <Router>
        <NavBar />
        <div className="App">
          <AttendanceRoutes />
        </div>
      </Router>
    </Provider>

  );
}

export default App;
