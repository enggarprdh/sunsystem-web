import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import store  from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
