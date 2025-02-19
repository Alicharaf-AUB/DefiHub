import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeP from "./HomePage";
import SignUp from "./SignUp";
import Login from "./LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Add Login Route */}
      </Routes>
    </Router>
  );
}

export default App;
