import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header con Navegación */}
      <header className="layout-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Code Cats Studio</h1>
            <p>Tu tienda de desarrollo y creatividad</p>
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

      {/* Contenido Principal */}
      <main className="layout-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="footer-content">
          <p>© 2024 Code Cats Studio - Desarrollado con 💻 y 🐱</p>
          <div className="footer-links">
            <a href="https://wa.me/591YOURNUMBER" target="_blank" rel="noopener noreferrer">
              📱 WhatsApp
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
              📸 Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;