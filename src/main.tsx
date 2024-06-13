import ReactDOM from 'react-dom/client'
import './index.css'
import 'flowbite'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import WelcomePage from './routes/Welcome'
import HomePage from './routes/Home'
import SearchPage from './routes/Search'
import DetailsPage from './routes/Details'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/recipes/:id' element={<DetailsPage />} />
      <Route path='*' element={<h1>404</h1>} />
      <></>
    </Routes>
  </BrowserRouter>
)
