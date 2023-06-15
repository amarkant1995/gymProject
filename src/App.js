import React from 'react';
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Home from './components/Login/Home/Home';
import TestComponent from './components/Testing/TestComponent';
import A from './components/Testing/A';
import B from './components/Testing/B';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminLayoutLayoutRoute from './Layout/AdminLayoutLayoutRoute';
import AddScheme from './components/SchemeMaster/AddScheme';
import AddPlan from './components/AddPlans/AddPlan';
import CheckAll from './components/Testing/CheckAll';

function App() {
  return (
    <div>
      <Routes>
       <Route path="/"element={<Login/>} ></Route> 
       <Route path="/check"element={<CheckAll/>} ></Route> 
       
       <Route element={<AdminLayoutLayoutRoute  />}>
       <Route path="/home"element={<Home/>} ></Route> 
       <Route path="/add-scheme"element={<AddScheme/>} ></Route> 
       <Route path="/add-plan"element={<AddPlan/>} ></Route> 
       
       
       </Route>
       <Route path="home1"element={<TestComponent/>} ></Route> 
       <Route path="A"element={<A/>} ></Route> 
       <Route path="B"element={<B/>} ></Route> 
      </Routes>
    </div>
  );
}

export default App;
