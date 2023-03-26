import Comision from './components/Comision.js';
import './App.css';
import { Provider } from './context/Provider.js';
import PorcentajeAsistencia from './components/PorcentajeAsistencia.js';

function App() {
  return (
    <div className="App">
      <Provider>
        <Comision />
        <PorcentajeAsistencia />
      </Provider>
    </div>
  );
}

export default App;
