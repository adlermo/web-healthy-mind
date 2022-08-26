import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
import Form from './pages/Form';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App;