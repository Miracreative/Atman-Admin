import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {store} from './redux/store.tsx';
import { Provider } from 'react-redux';


import App from './App.tsx'

import './scss/app.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <Router 
          basename="/"
        //  basename="/TummiesAdmin/"
        >
          <App/>
      </Router>
    </Provider>
  </StrictMode>,
)
