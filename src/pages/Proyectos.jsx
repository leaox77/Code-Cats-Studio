import { useState } from 'react';
import '../components/Proyectos.css';

const Proyectos = () => {
  const [proyectos] = useState([
    {
      id: 1,
      nombre: "E-commerce React",
      descripcion: "Tienda online moderna con carrito de compras, pasarela de pago y panel administrativo.",
      tecnologias: ["React", "Node.js", "MongoDB", "Stripe"],
      estado: "Completado",
      imagen: "🛒",
      demo: "#",
      github: "#"
    },
    {
      id: 2,
      nombre: "App de Tareas",
      descripcion: "Aplicación de gestión de tareas con recordatorios, categorías y sincronización en la nube.",
      tecnologias: ["React Native", "Firebase", "Redux"],
      estado: "En Desarrollo",
      imagen: "📱",
      demo: "#",
      github: "#"
    },
    {
      id: 3,
      nombre: "Dashboard Analytics",
      descripcion: "Panel de control con gráficos interactivos, métricas en tiempo real y reportes automáticos.",
      tecnologias: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      estado: "Completado",
      imagen: "📊",
      demo: "#",
      github: "#"
    },
    {
      id: 4,
      nombre: "API REST Segura",
      descripcion: "Backend robusto con autenticación JWT, documentación Swagger y tests automatizados.",
      tecnologias: ["Node.js", "Express", "JWT", "Jest", "Docker"],
      estado: "Completado",
      imagen: "🔐",
      demo: "#",
      github: "#"
    },
    {
      id: 5,
      nombre: "Juego Web Multiplayer",
      descripcion: "Juego interactivo en tiempo real con sockets, salas multijugador y ranking global.",
      tecnologias: ["Socket.io", "Phaser", "React", "Redis"],
      estado: "En Desarrollo",
      imagen: "🎮",
      demo: "#",
      github: "#"
    },
    {
      id: 6,
      nombre: "App de Delivery",
      descripcion: "Plataforma completa de delivery con tracking en tiempo real y múltiples métodos de pago.",
      tecnologias: ["React Native", "Google Maps API", "Node.js", "MongoDB"],
      estado: "Planificado",
      imagen: "🚚",
      demo: "#",
      github: "#"
    }
  ]);

  const [filtro, setFiltro] = useState('todos');

  const proyectosFiltrados = proyectos.filter(proyecto => {
    if (filtro === 'todos') return true;
    return proyecto.estado === filtro;
  });

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Completado': return '#10b981';
      case 'En Desarrollo': return '#f59e0b';
      case 'Planificado': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="proyectos-container">
      <div className="proyectos-header">
        <h1>📁 Nuestros Proyectos</h1>
        <p className="proyectos-subtitle">
          Descubre los proyectos en los que hemos trabajado y nuestras próximas ideas
        </p>
      </div>

      {/* Filtros */}
      <div className="filtros-section">
        <div className="filtros-container">
          <button 
            className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltro('todos')}
          >
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtro === 'Completado' ? 'active' : ''}`}
            onClick={() => setFiltro('Completado')}
          >
            Completados
          </button>
          <button 
            className={`filtro-btn ${filtro === 'En Desarrollo' ? 'active' : ''}`}
            onClick={() => setFiltro('En Desarrollo')}
          >
            En Desarrollo
          </button>
          <button 
            className={`filtro-btn ${filtro === 'Planificado' ? 'active' : ''}`}
            onClick={() => setFiltro('Planificado')}
          >
            Planificados
          </button>
        </div>
      </div>

      {/* Grid de Proyectos */}
      <div className="proyectos-grid">
        {proyectosFiltrados.map(proyecto => (
          <div key={proyecto.id} className="proyecto-card">
            <div className="proyecto-header">
              <div className="proyecto-emoji">{proyecto.imagen}</div>
              <div className="proyecto-info">
                <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
                <span 
                  className="proyecto-estado"
                  style={{ backgroundColor: getEstadoColor(proyecto.estado) }}
                >
                  {proyecto.estado}
                </span>
              </div>
            </div>
            
            <p className="proyecto-descripcion">{proyecto.descripcion}</p>
            
            <div className="proyecto-tecnologias">
              {proyecto.tecnologias.map((tech, index) => (
                <span key={index} className="tecnologia-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="proyecto-actions">
              <a href={proyecto.demo} className="action-btn demo-btn" target="_blank" rel="noopener noreferrer">
                🌐 Demo
              </a>
              <a href={proyecto.github} className="action-btn github-btn" target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="estadisticas-section">
        <div className="estadistica-card">
          <div className="estadistica-emoji">✅</div>
          <div className="estadistica-info">
            <h3>{proyectos.filter(p => p.estado === 'Completado').length}</h3>
            <p>Proyectos Completados</p>
          </div>
        </div>
        <div className="estadistica-card">
          <div className="estadistica-emoji">🛠️</div>
          <div className="estadistica-info">
            <h3>{proyectos.filter(p => p.estado === 'En Desarrollo').length}</h3>
            <p>En Desarrollo</p>
          </div>
        </div>
        <div className="estadistica-card">
          <div className="estadistica-emoji">📅</div>
          <div className="estadistica-info">
            <h3>{proyectos.filter(p => p.estado === 'Planificado').length}</h3>
            <p>Planificados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;