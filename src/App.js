import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Display from "./Components/Display/Display";
import Dashboard from "./Components/Dashboard";
import { fakeProjects, fakeTasks } from "./fakeData";

import { Context } from "./context";

function App() {
  const [projects, setProjects] = useState(fakeProjects);
  const [tasks, setTasks] = useState(fakeTasks);

  return (
    <Router>
      <div className="flex flex-col lg:flex-row items-center justify-start bg-white text-slate-800">
        <Context.Provider value={[projects, setProjects]}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/:project"
              element={<Display tasks={tasks} setTasks={setTasks} />}
            />
          </Routes>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
