import ReactDOM from 'react-dom/client'
import { HomePage, SearchPage, Welcome, Details } from './App.tsx'
import './index.css'
import 'flowbite'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/recipes/:id' element={<Details />} />
      <Route path='*' element={<h1>404</h1>} />
      <></>
    </Routes>
  </BrowserRouter>
)