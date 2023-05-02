import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className='bg-dark text-white max-w-[750px] min-h-[300px] min-w-[550px] w-fit h-fit relative'>
   <App />
   </div>
  </React.StrictMode>,
)
