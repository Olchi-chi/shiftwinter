import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';

import Header from './components/Header/Header';
// import SearchSection from './components/SeacrhSection/SearchSection'
// import Catalog from './components/CatalogSection/CatalogSection'

import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';

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

    <BrowserRouter>
      <Header /> 
      
      <Routes>
        <Route штвуч path="/home" element={<Catalog />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
