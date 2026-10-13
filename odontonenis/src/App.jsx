import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import miFondo from './assets/fondo.jpeg'; 

export default function App() {
  const handleLogin = () => {
    alert('¡Iniciar sesión!');
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.leftPanel}></div>

      <div style={styles.centerPanel}>
        <h1 style={styles.title}>BIENVENIDA</h1>
        <button style={styles.button} onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>

      <div style={styles.rightPanel}></div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
  },
  leftPanel: {
    width: '26%', 
    backgroundImage: `url(${miFondo})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '250px auto',
    backgroundColor: '#ffffff',
  },
  centerPanel: {
    width: '40%', 
    backgroundColor: '#83C5BE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
  },
  rightPanel: {
    flex: 1, 
    backgroundImage: `url(${miFondo})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '250px auto',
    backgroundColor: '#ffffff',
  },
title: {
    color: '#006D77',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    margin: 0,
  },
  button: {
    backgroundColor: '#006D77',
    color: '#EDF6F9',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 25px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};