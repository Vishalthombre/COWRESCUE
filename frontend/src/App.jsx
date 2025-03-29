import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import CowRescueDashboard from "./components/CowRescueDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import JoinOrganization from "./components/JoinOrganization";  // New page
import News from "./components/News";  // New page
import Contact from "./components/Contact";  // New page
import About from "./components/About";  // New page
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<CowRescueDashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/join" element={<JoinOrganization />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* Login & Register only on Join Organization page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
