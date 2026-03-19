import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';

import Header from './components/Header/Header';
// import SearchSection from './components/SeacrhSection/SearchSection'
// import Catalog from './components/CatalogSection/CatalogSection'

import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail/CarDetail';
import Authorization from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    // <>
    //   <Header/>
    //   <main>
    //     <SearchSection/>
    //     <section className="main__catalog">
    //       <Catalog/>
    //     </section>
    //   </main>
      

    // </>
    <div className="container">
<BrowserRouter >
      <Header /> 
      
      <Routes>
        <Route path="/home" element={<Catalog />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
