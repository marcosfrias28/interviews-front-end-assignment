import ReactDOM from 'react-dom/client'
import { HomePage, SearchPage, Welcome } from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='*' element={<h1>404</h1>} />
      <></>
    </Routes>
  </BrowserRouter>
)
