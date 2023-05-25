import "./App.css";
import { AuthContext } from "./context/authContext";
import { LoadingContext } from "./context/loadingContext";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Family from "./pages/Family";
import Locations from "./pages/Locations";

function App() {
  const { getToken, user } = useContext(LoadingContext);

  return (
    <div className='App'>
      {!getToken() && (
        <>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Landing />} />
          </Routes>
        </>
      )}

      {/* PROTECTED ROUTES */}
      {getToken() && (
        <>
          <Navbar>
            <Routes>
              <Route path='/cars' element={<Cars />} />
              <Route path='/events' element={<Events />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/family' element={<Family />} />
              <Route path='/locations' element={<Locations />} />
              <Route path='*' element={<Events />} />
            </Routes>
          </Navbar>
        </>
      )}
    </div>
  );
}

export default App;
