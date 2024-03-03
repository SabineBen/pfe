// import './App.css'
import Home from "./components/Home/Home"
import Login from "./components/Auth/Login/Login"
import Signup from "./components/Auth/Register/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import UserRequest from "./components/UserRequest/UserRequest";
import Navbar from "./components/Navbar/Navbar";
import Besoins from "./components/Admin/Besoins/Besoins";
import Data from "./components/Admin/Besoins/Data";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Besoins />} />
          <Route path="/besoins" element={<Besoins />} />
          <Route path="data" element={<Data />} />
          <Route path="/demande" element={<UserRequest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;