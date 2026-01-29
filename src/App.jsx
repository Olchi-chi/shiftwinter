import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import SearchSection from './components/SeacrhSection/SearchSection'
import Catalog from './components/Catalog'

function App() {
  return (
    <>
      <Header/>
      <main>
        <SearchSection/>
        <section className="main__catalog">
          <Catalog/>
        </section>
      </main>
      

    </>
  )
}

export default App
