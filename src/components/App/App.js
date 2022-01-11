
import React, { useState } from 'react';
import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Preferences from "../Preferences/Preferences";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from '../Login/Login';

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
