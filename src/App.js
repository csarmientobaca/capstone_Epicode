import React from 'react';
import './App.css';
import "mapbox-gl/dist/mapbox-gl.css";
import CesarOrPlebei from "./components/CesarOrPeblei.jsx";
import FormLogin from "./components/FormLogin.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import LoginCesar from "./components/LoginCesar"
import ProfileCesar from "./components/ProfileCesar"

import NavBar from './components/NavBar';
import MapPart from './components/MapPart';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<CesarOrPlebei />} />
          <Route path='/login' element={<FormLogin />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/map' element={<MapPart />} />
          <Route path='/logincesar' element={<LoginCesar />} />
          <Route path='/profilecesar' element={<ProfileCesar />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
