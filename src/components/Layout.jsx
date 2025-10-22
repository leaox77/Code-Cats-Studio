import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';
import logo from '../assets/logo.png';
import fantasma from '../assets/fantama.png';
import batDark from '../assets/darkBat.png';
import batLight from '../assets/whiteBat.png';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const batsContainerRef = useRef(null);
  const animationFrameRef = useRef(null);

 /* useEffect(() => {
    const container = batsContainerRef.current;
    if (!container) return;

    let bats = [];
    let batId = 0;

    const createBat = () => {
      const bat = {
        id: batId++,
        element: document.createElement('img'),
        x: 50, // Centro horizontal (50%)
        y: 50, // Centro vertical (50%)
        vx: (Math.random() - 0.5) * 4, // Velocidad horizontal
        vy: (Math.random() - 0.5) * 4, // Velocidad vertical
        rotation: Math.random() * 360,
        size: 20 + Math.random() * 40,
        opacity: 0.3 + Math.random() * 0.7,
        created: Date.now(),
        life: 3000 + Math.random() * 4000 // Vida entre 3-7 segundos
      };

      bat.element.src = darkMode ? batLight : batDark;
      bat.element.className = 'bat';
      bat.element.style.width = `${bat.size}px`;
      bat.element.style.opacity = bat.opacity;
      bat.element.style.left = `${bat.x}%`;
      bat.element.style.top = `${bat.y}%`;
      bat.element.style.transform = `rotate(${bat.rotation}deg)`;

      container.appendChild(bat.element);
      bats.push(bat);
    };

    const updateBats = () => {
      const now = Date.now();
      
      // Crear nuevos murciélagos constantemente
      if (bats.length < 25 && Math.random() < 0.3) {
        createBat();
      }

      // Actualizar posición de murciélagos existentes
      bats.forEach((bat, index) => {
        // Mover murciélago
        bat.x += bat.vx;
        bat.y += bat.vy;
        bat.rotation += bat.vx * 2;

        // Aplicar movimiento
        bat.element.style.left = `${bat.x}%`;
        bat.element.style.top = `${bat.y}%`;
        bat.element.style.transform = `rotate(${bat.rotation}deg)`;

        // Remover murciélagos que salieron de pantalla o terminaron su vida
        const isOutOfBounds = bat.x < -10 || bat.x > 110 || bat.y < -10 || bat.y > 110;
        const isOld = now - bat.created > bat.life;
        
        if (isOutOfBounds || isOld) {
          container.removeChild(bat.element);
          bats.splice(index, 1);
        }
      });

      animationFrameRef.current = requestAnimationFrame(updateBats);
    };

    // Crear murciélagos iniciales
    for (let i = 0; i < 15; i++) {
      setTimeout(createBat, i * 100);
    }

    // Iniciar animación
    animationFrameRef.current = requestAnimationFrame(updateBats);

    // Limpiar al desmontar
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      bats.forEach(bat => {
        if (bat.element.parentNode === container) {
          container.removeChild(bat.element);
        }
      });
      bats = [];
    };
  }, [darkMode]);*/

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="layout-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Code Cats Studio" width={200} />
            <p>El conocimiento debe compartirse y no guardarse.</p>
          </div>
          
          <nav className="nav-menu">
            <Link 
              to="/compras" 
              className={`nav-link ${location.pathname === '/' || location.pathname === '/compras' ? 'active' : ''}`}
            >
              🛒 Tienda
            </Link>
            <Link 
              to="/proyectos" 
              className={`nav-link ${location.pathname === '/proyectos' ? 'active' : ''}`}
            >
              📁 Proyectos
            </Link>
          </nav>

          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </header>

      <main className="layout-main">
        {/*<div ref={batsContainerRef} className="bats-container"></div>*/}
        <div className="contenido">{children}</div>
        <img className="fantasma" src={fantasma} alt="Gato Fantasma" />
      </main>

      <footer className="layout-footer">
        <div className="footer-content">
          <p>© 2025 Code Cats Studio - Desarrollado con 💻 y 🐱</p>
          <div className="footer-links">
            <a href="https://wa.me/59175268812" target="_blank" rel="noopener noreferrer">
              📱 WhatsApp
            </a>
            <a href="https://instagram.com/code_cats.studio" target="_blank" rel="noopener noreferrer">
              📸 Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;