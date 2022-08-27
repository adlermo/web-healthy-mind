import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
import LogIn from './pages/LogIn/Login';
import Register from './pages/Register/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App;