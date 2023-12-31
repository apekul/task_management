import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Display from "./Components/Display/Display";
import Dashboard from "./Components/Dashboard";

import { Context } from "./context";

// popup panel for deleting functionalities

// Fake url handling
// Button sort by complete, move tasks to column: todo, doing, done??
// More project options: close project, archive closet projects?
// Task/subTask: clone?, move to other project?

function App() {
  const [data, setData] = useState(() => {
    let getStorage = JSON.parse(localStorage.getItem("ManagementData"));
    if (!getStorage) {
      localStorage.setItem("ManagementData", JSON.stringify({}));
      return {};
    }
    return getStorage;
  });
  const [hideNav, setHideNav] = useState(true);

  useEffect(() => {
    localStorage.setItem("ManagementData", JSON.stringify(data));
  }, [data]);

  return (
    <Router>
      <div className="flex flex-col lg:flex-row items-center justify-start bg-white text-slate-800">
        <Context.Provider value={[data, setData]}>
          <Navbar hideNav={hideNav} setHideNav={setHideNav} />
          <div className={`w-full h-screen transition-all`}>
            <Routes>
              <Route path="/" element={<Dashboard hideNav={hideNav} />} />
              <Route
                path="/:projectID"
                element={<Display hideNav={hideNav} />}
              />
            </Routes>
          </div>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
