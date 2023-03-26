import { Provider } from './context/Provider.js';
import { AttendanceRoutes } from './routes.js';
import './App.css';


const App = () => {
  return (
    <Provider>
      <div className="App">
        <AttendanceRoutes />
      </div>
    </Provider>

  );
}

export default App;
