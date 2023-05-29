import './App.css';
import "mapbox-gl/dist/mapbox-gl.css"
// import MapPart from './components/MapPart';
import CesarOrPlebei from "./components/CesarOrPeblei.jsx"
import FormLogin from "./components/FormLogin.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';

import NavBar from './components/NavBar';


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<CesarOrPlebei />} />
          <Route path='/login' element={<FormLogin />} />
          <Route path='/profile' element={<ProfilePage />} />

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
