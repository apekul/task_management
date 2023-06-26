import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Overview, Stats, Projects, Chat, Calendar, Settings } from "./layout";

function App() {
  return (
    <Router>
      <div className="h-screen flex items-center justify-start">
        <Navbar />
        <Routes>
          <Route path="/Overview" element={<Overview />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
        {/* <div>Content</div> */}
      </div>
    </Router>
  );
}

export default App;
