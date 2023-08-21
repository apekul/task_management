import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Display from "./Components/Display/Display";
import Dashboard from "./Components/Dashboard";
// import { initialData } from "./fakeData";

import { Context } from "./context";

// Store location state in localStorage???
// Store data inside localStorage

function App() {
  const [data, setData] = useState(() => {
    let getStorage = JSON.parse(localStorage.getItem("ManagementData"));
    if (!getStorage) {
      localStorage.setItem("ManagementData", JSON.stringify({}));
      return {};
    }
    return getStorage;
  });

  useEffect(() => {
    localStorage.setItem("ManagementData", JSON.stringify(data));
  }, [data]);

  return (
    <Router>
      <div className="flex select-none flex-col lg:flex-row items-center justify-start bg-white text-slate-800">
        <Context.Provider value={[data, setData]}>
          <Navbar />
          <div className="lg:ml-52 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/:projectID" element={<Display />} />
            </Routes>
          </div>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
