import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.js"
import Login from "./pages/Login.js"
import Home from "./pages/Home.js"
import AdminAssignment from "./pages/AdminAssignment.js";
import AuthProvider from "./components/AuthProvider.js";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin-access" element={<AdminAssignment />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
