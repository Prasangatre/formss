
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import  HomePage  from './Components/HomePage/HomePage';
import Protected from './Components/Protected';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/home" element={<HomePage/>}/>
<Route path="/login" element={<Login/>}/>

<Route path="/" element={<Signup/>}/>

        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
