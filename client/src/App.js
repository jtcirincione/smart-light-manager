import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.js"
import Login from "./pages/Login.js"
import Home from "./pages/Home.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
