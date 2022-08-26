import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
import LogIn from './pages/LogIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App;