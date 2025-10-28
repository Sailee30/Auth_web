import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Doubt from "./pages/Doubt";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/su" element={<SignUp />} />
        <Route path="/ho" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/au" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/fp" element={<ForgotPassword />} />
        <Route path="/cp" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/do" element={<ProtectedRoute><Doubt /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
