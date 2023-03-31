import { Provider } from './context/Provider.js';
import { AttendanceRoutes } from './routes.js';
import NavBar from './components/NavBar.js';
import './App.css';


const App = () => {
  return (
    <Provider>
      <NavBar />
      <div className="App">
        <AttendanceRoutes />
      </div>
    </Provider>

  );
}

export default App;
