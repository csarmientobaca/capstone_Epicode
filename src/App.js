import './App.css';
import { Container, Form } from "react-bootstrap";


import "mapbox-gl/dist/mapbox-gl.css"
import Header from './components/Header';
import MapPart from './components/MapPart';
import CesarOrPlebei from "./components/CesarOrPeblei.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<CesarOrPlebei />} />
          <Route />

          <Route />

          {/* <Container>
            <Header />
            <MapPart />
          </Container> */}
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
