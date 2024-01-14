// import React from 'react'
// import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux';
import { store } from './components/state/state';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
 //<Provider store={store}>
 <HashRouter>
  <Provider store={store}>
    <App/>
    </Provider>
  </HashRouter>
  //</Provider>
  //</BrowserRouter>,
)