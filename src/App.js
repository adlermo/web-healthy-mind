import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
import LogIn from './pages/LogIn/Login';
import Register from './pages/Register/Register';
import Patients from './pages/Patients/Patients';
import Sessions from './pages/Sessions/Sessions';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;