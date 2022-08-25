import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
import About from './pages/About';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App;