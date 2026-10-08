import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Bienvenidos a DentalSP! 🦷</h1>
      <p>Proyecto en desarrollo con React + Vite.</p>
    </div>
  )

}

export default App
