// import React from 'react'
// import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
      <App/>
  //</BrowserRouter>,
)