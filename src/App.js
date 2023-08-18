import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Display from "./Components/Display/Display";
import Dashboard from "./Components/Dashboard";
import { initialData } from "./fakeData";

import { Context } from "./context";

// Store location state in localStorage???
// Store data inside localStorage

function App() {
  // const [projects, setProjects] = useState(initialData);
  const [data, setData] = useState(initialData);
  return (
    <Router>
      <div className="flex select-none flex-col lg:flex-row items-center justify-start bg-white text-slate-800">
        <Context.Provider value={[data, setData]}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:project" element={<Display />} />
          </Routes>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
