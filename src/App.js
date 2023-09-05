import {
  BrowserRouter as Router,
  Route,
  // Link,
  Routes
} from "react-router-dom";
import Transacciones from "./components/Transacciones";
import TransaccionNueva from "./components/TransaccionNueva";
import TransaccionesAPI from "./components/TransaccionesAPI";  // <-- Don't forget to import this
import IniciarSesion from "./components/IniciarSesion";  // <-- Don't forget to import this
import Registro from "./components/Registro";  // <-- Don't forget to import this
import NuevoPaciente from "./components/NuevoPaciente";
import AltaTabaco from "./components/AltaTabaco";  // <-- Don't forget to import this
import './App.css';

function App() {
  return (
    <Router>
         <div>
         {/* ** Navigation Bar in all Pages** */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/transacciones">Transacciones</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/transaccion-nueva" element={<TransaccionNueva />} />
          <Route path="/transacciones-api" element={<TransaccionesAPI />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nuevo-paciente" element={<NuevoPaciente />} />
          <Route path="/alta-tabaco" element={<AltaTabaco />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;