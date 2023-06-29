import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { Overview, Stats, Projects, Chat, Calendar, Settings } from "./content";
import { allData } from "./assets/data";
import { Context } from "./context";

function App() {
  const [projects, setProjects] = useState(allData);
  return (
    <Router>
      <div className="flex items-center justify-start">
        <Context.Provider value={[projects, setProjects]}>
          <Navbar />
          <Routes>
            <Route path="/Overview" element={<Overview />} />
            <Route path="/Stats" element={<Stats />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
