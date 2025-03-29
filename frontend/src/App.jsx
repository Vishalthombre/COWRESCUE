import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import CowRescueDashboard from "./components/CowRescueDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<CowRescueDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
