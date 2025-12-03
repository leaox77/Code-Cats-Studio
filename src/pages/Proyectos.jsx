import { useState, useEffect, useCallback } from 'react';
import '../components/Proyectos.css';

const Proyectos = () => {
  // URLs de las hojas de cálculo
  const scriptURLHalloween = "https://script.google.com/macros/s/AKfycbx-ra6Vn3YbWWmMN3Dpa31PLO3wUNi1g2bfZswCU0SqNkgE643yNKVKbBaHoLgMTzqT/exec";
  const scriptURLNavidad = "https://script.google.com/macros/s/AKfycbwgGcEYPszmjzD2OvdzNREPGuvQIktDgaZwHVYu78PYMpIMXye2Peq_Phc-Fibgj4ao/exec";

  const [vistaActual, setVistaActual] = useState('principal'); // 'principal', 'halloween', 'navidad'

  // 🎃 Ideas de proyectos sugeridas para Halloween
  const ideasHalloween = [
    { nombre: '🎃 Página de Halloween', descripcion: 'Landing page temática con animaciones spooky y countdown' },
    { nombre: '👻 Blog de historias de terror', descripcion: 'Blog para compartir relatos de terror cortos con votaciones' },
    { nombre: '🧛 Invitación fiesta Halloween', descripcion: 'Página de invitación interactiva con confirmación de asistencia' },
    { nombre: '🕸️ Galería de disfraces', descripcion: 'Galería para compartir fotos de disfraces con sistema de likes' },
    { nombre: '🦇 Juego de trivia Halloween', descripcion: 'Quiz interactivo sobre películas y leyendas de terror' },
    { nombre: '🎭 Catálogo de máscaras', descripcion: 'Galería de máscaras y disfraces con filtros por categoría' },
    { nombre: '💀 Portfolio terrorífico', descripcion: 'Portfolio personal con diseño dark y efectos de terror' },
    { nombre: '🌙 Recetario de pociones', descripcion: 'Recetas de bebidas temáticas con efectos visuales mágicos' },
    { nombre: '📅 Calendario de eventos terroríficos', descripcion: 'Eventos de Halloween con filtros por tipo y fecha en tu región' },
    { nombre: '🗺️ Mapa de leyendas urbanas', descripcion: 'Mapa interactivo donde usuarios marcan lugares con historias de terror' },
    { nombre: '🏆 Desafío de decoración', descripcion: 'Concurso de decoración de casas con votaciones y galería de fotos' },
    { nombre: '😱 Clasificador de miedo', descripcion: 'Quiz que evalúa qué tan valiente eres según tus respuestas' },
    { nombre: '🎵 Playlists de terror', descripcion: 'Listas de música ambiental, soundtracks y efectos de sonido' },
    { nombre: '✍️ Diseñador de fuentes terroríficas', descripcion: 'Convierte texto a estilos góticos, ensangrentados y más' },
    { nombre: '🎨 Manualidades DIY Halloween', descripcion: 'Proyectos paso a paso para decoración y disfraces caseros' },
    { nombre: '🎬 Críticas de cine de terror', descripcion: 'Reseñas clasificadas por subgéneros: slasher, psicológico, found footage' }
  ];

  // 🎄 Ideas de proyectos sugeridas para Navidad
  const ideasNavidad = [
    { nombre: '🎄 Página de Navidad', descripcion: 'Landing page temática con animaciones navideñas y cuenta regresiva' },
    { nombre: '🎅 Lista de regalos interactiva', descripcion: 'Aplicación para gestionar regalos y presupuestos' },
    { nombre: '❄️ Tarjeta navideña animada', descripcion: 'Crea tarjetas personalizadas con animaciones' },
    { nombre: '🛷 Juego de trineo', descripcion: 'Juego simple donde ayudas a Santa a entregar regalos' },
    { nombre: '🎁 Catálogo de regalos', descripcion: 'Galería de ideas de regalos con filtros por categoría' },
    { nombre: '🌟 Portfolio navideño', descripcion: 'Portfolio personal con diseño festivo y efectos de nieve' },
    { nombre: '🍪 Recetario de galletas', descripcion: 'Recetas de galletas temáticas con fotos y pasos' },
    { nombre: '📅 Calendario de adviento', descripcion: 'Cuenta regresiva interactiva con sorpresas diarias' },
    { nombre: '🎵 Playlist navideña', descripcion: 'Colección de villancicos y música festiva con reproductor' },
    { nombre: '🕯️ Velas de adviento virtuales', descripcion: 'Simulador de velas con oraciones y reflexiones diarias' },
    { nombre: '⛄ Creador de muñecos de nieve', descripcion: 'Diseña tu muñeco de nieve personalizado con accesorios' },
    { nombre: '🎨 Decorador navideño 3D', descripcion: 'Visualiza cómo quedaría tu casa decorada para navidad' },
    { nombre: '📧 Carta a Santa', descripcion: 'Formulario mágico para enviar cartas a Santa Claus' },
    { nombre: '🎲 Intercambio de regalos', descripcion: 'Organizador de amigo secreto con sorteo automático' },
    { nombre: '🏠 Tour virtual de casas navideñas', descripcion: 'Galería 360° de casas decoradas espectacularmente' },
    { nombre: '🎬 Películas navideñas', descripcion: 'Catálogo de películas clásicas con trailers y reseñas' },
    { nombre: '🌍 Tradiciones del mundo', descripcion: 'Mapa interactivo mostrando cómo se celebra la navidad globalmente' },
    { nombre: '🎪 Eventos navideños locales', descripcion: 'Calendario de ferias, mercados y festivales cercanos' },
    { nombre: '✨ Luces navideñas sincronizadas', descripcion: 'Simulador de luces con música y patrones programables' },
    { nombre: '📖 Libro de recuerdos', descripcion: 'Álbum digital para compartir fotos y mensajes familiares' }
  ];

  const [proyectosHalloween, setProyectosHalloween] = useState([]);
  const [proyectosNavidad, setProyectosNavidad] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [toastMensaje, setToastMensaje] = useState('');
  const [toastTipo, setToastTipo] = useState('success');

  const [formulario, setFormulario] = useState({
    nombre_proyecto: '',
    descripcion: '',
    nombre_invitado: '',
    email_invitado: '',
    link_figma: ''
  });

  // Carga de proyectos usando JSONP para evitar CORS
  const cargarProyectos = useCallback((categoria, scriptURL) => {
    setCargando(true);

    const callbackName = 'cb_list_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    let timeoutId;

    window[callbackName] = (response) => {
      clearTimeout(timeoutId);
      console.log('📥 Respuesta recibida:', response);

      try {
        if (response?.status === 'success') {
          if (categoria === 'halloween') {
            setProyectosHalloween(response.proyectos || []);
          } else if (categoria === 'navidad') {
            setProyectosNavidad(response.proyectos || []);
          }
        } else {
          console.warn('⚠️ Status no exitoso, cargando ejemplos');
          cargarProyectosEjemplo();
        }
      } catch (err) {
        console.error('❌ Error procesando respuesta:', err);
        cargarProyectosEjemplo();
      } finally {
        delete window[callbackName];
        if (script && script.parentNode) script.parentNode.removeChild(script);
        setCargando(false);
      }
    };

    const url = `${scriptURL}?action=list&categoria=${categoria}&callback=${callbackName}`;
    console.log('📤 Cargando proyectos desde:', url);

    script.src = url;
    script.async = true;

    script.onerror = (err) => {
      clearTimeout(timeoutId);
      console.error('❌ Error de red al cargar script:', err);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
      cargarProyectosEjemplo();
      setCargando(false);
    };

    // Timeout de 10 segundos
    timeoutId = setTimeout(() => {
      console.warn('⏰ Timeout al cargar proyectos');
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
      cargarProyectosEjemplo();
      setCargando(false);
    }, 10000);

    document.body.appendChild(script);
  }, []);

  const cargarProyectosEjemplo = () => {
    const ejemplos = [
      { id: 1, nombre_proyecto: "E-commerce React", descripcion: "Tienda online moderna", presentador: "Code Cats" },
      { id: 2, nombre_proyecto: "Dashboard Analytics", descripcion: "Panel con gráficos", presentador: "María López" },
      { id: 3, nombre_proyecto: "API REST JWT", descripcion: "Backend seguro", presentador: "Carlos M." }
    ];
    setProyectosHalloween(ejemplos);
    setProyectosNavidad(ejemplos);
  };

  // Efecto para cargar proyectos una vez montado el componente
  useEffect(() => {
    cargarProyectos('halloween', scriptURLHalloween);
    cargarProyectos('navidad', scriptURLNavidad);
  }, [cargarProyectos, scriptURLHalloween, scriptURLNavidad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const seleccionarIdea = (idea) => {
    setFormulario(prev => ({
      ...prev,
      nombre_proyecto: idea.nombre,
      descripcion: idea.descripcion
    }));
  };

  const validarFormulario = () => {
    if (!formulario.nombre_proyecto.trim()) {
      mostrarToastMensaje('❌ Nombre del proyecto obligatorio', 'error');
      return false;
    }
    if (!formulario.descripcion.trim()) {
      mostrarToastMensaje('❌ Descripción obligatoria', 'error');
      return false;
    }
    // Siempre validamos datos de invitado
    if (!formulario.nombre_invitado.trim()) {
      mostrarToastMensaje('❌ Tu nombre es obligatorio', 'error');
      return false;
    }
    if (!formulario.email_invitado.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email_invitado)) {
      mostrarToastMensaje('❌ Email inválido', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setEnviando(true);

    const categoria = vistaActual; // 'halloween' o 'navidad'
    const scriptURL = categoria === 'halloween' ? scriptURLHalloween : scriptURLNavidad;

    const datosProyecto = {
      nombre_proyecto: formulario.nombre_proyecto,
      descripcion: formulario.descripcion,
      nombre_invitado: formulario.nombre_invitado,
      email_invitado: formulario.email_invitado,
      fecha: new Date().toLocaleString('es-BO'),
      categoria: categoria,
      link_figma: formulario.link_figma
    };

    const callbackName = 'callback_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    let timeoutId;

    window[callbackName] = (response) => {
      clearTimeout(timeoutId);
      console.log('📥 Respuesta registro:', response);

      try {
        if (response?.status === "success") {
          mostrarToastMensaje('🎉 Proyecto registrado!', 'success');
          limpiarFormulario();
          setMostrarFormulario(false);
          cargarProyectos(categoria, scriptURL);
        } else {
          console.error('❌ Status error:', response);
          mostrarToastMensaje('❌ Error al registrar: ' + (response?.message || 'Desconocido'), 'error');
        }
      } catch (err) {
        console.error('❌ Error procesando registro:', err);
        mostrarToastMensaje('❌ Error al procesar respuesta', 'error');
      } finally {
        delete window[callbackName];
        if (script && script.parentNode) script.parentNode.removeChild(script);
        setEnviando(false);
      }
    };

    const payload = encodeURIComponent(JSON.stringify(datosProyecto));
    const url = `${scriptURL}?action=register&data=${payload}&callback=${callbackName}`;
    console.log('📤 Registrando proyecto:', datosProyecto);
    console.log('📤 URL:', url);

    script.src = url;
    script.async = true;

    script.onerror = (err) => {
      clearTimeout(timeoutId);
      console.error('❌ Error de red al registrar:', err);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
      mostrarToastMensaje('⚠️ Error de conexión al servidor', 'error');
      setEnviando(false);
    };

    // Timeout de 15 segundos para registro
    timeoutId = setTimeout(() => {
      console.warn('⏰ Timeout al registrar proyecto');
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
      mostrarToastMensaje('⏰ Tiempo de espera agotado', 'error');
      setEnviando(false);
    }, 15000);

    document.body.appendChild(script);
  };

  const limpiarFormulario = () => {
    setFormulario({ nombre_proyecto: '', descripcion: '', nombre_invitado: '', email_invitado: '', link_figma: '' });
  };

  const mostrarToastMensaje = (mensaje, tipo = 'success') => {
    setToastMensaje(mensaje);
    setToastTipo(tipo);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 4000);
  };

  return (
    <div className="proyectos-container">
      {vistaActual === 'principal' && (
        <>
          <div className="proyectos-header">
            <h1>🐱 Proyectos Code Cats Studio</h1>
            <p className="proyectos-subtitle">Selecciona un curso para ver los proyectos</p>
          </div>

          <div className="cursos-cards-container">
            <div className="curso-card" onClick={() => setVistaActual('halloween')}>
              <div className="curso-icon">🎃</div>
              <h3 className="curso-titulo">Halloween - HTML & CSS</h3>
              <p className="curso-descripcion">Proyectos del curso de HTML y CSS con temática de Halloween (Octubre 2025)</p>
              <button className="btn-ver-proyectos">Ver Proyectos →</button>
            </div>

            <div className="curso-card" onClick={() => setVistaActual('navidad')}>
              <div className="curso-icon">🎄</div>
              <h3 className="curso-titulo">Navidad - Figma</h3>
              <p className="curso-descripcion">Proyectos del curso de Figma con temática de Navidad (Diciembre 2025)</p>
              <button className="btn-ver-proyectos">Ver Proyectos →</button>
            </div>
          </div>
        </>
      )}

      {vistaActual === 'halloween' && (
        <>
          <div className="proyectos-header">
            <button className="btn-volver" onClick={() => setVistaActual('principal')}>
              ← Volver
            </button>
            <h1>🎃 Proyectos Halloween - HTML & CSS</h1>
            <p className="proyectos-subtitle">Proyectos del curso de Octubre</p>
          </div>

          <div className="proyectos-lista-section">
            <h2 className="seccion-titulo">📋 Proyectos Registrados - Halloween</h2>
            {cargando ? (
              <div className="loading"><div className="spinner"></div><p>Cargando proyectos...</p></div>
            ) : proyectosHalloween.length === 0 ? (
              <div className="empty-state"><p className="empty-icon">📦</p><p className="empty-message">Aún no hay proyectos</p><p className="empty-submessage">¡Sé el primero!</p></div>
            ) : (
              <div className="proyectos-grid">
                {proyectosHalloween.map((proyecto) => (
                  <div key={proyecto.id} className="proyecto-card">
                    <div className="proyecto-icon">🎃</div>
                    <h3 className="proyecto-nombre">{proyecto.nombre_proyecto}</h3>
                    <p className="proyecto-descripcion">{proyecto.descripcion}</p>
                    <div className="proyecto-footer">
                      <div className="proyecto-presentador"><span className="presentador-icon">👤</span><span className="presentador-nombre">{proyecto.presentador}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {vistaActual === 'navidad' && (
        <>
          <div className="proyectos-header">
            <button className="btn-volver" onClick={() => setVistaActual('principal')}>
              ← Volver
            </button>
            <h1>🎄 Proyectos Navidad - Curso UX/UI</h1>
            <p className="proyectos-subtitle">Proyectos del curso de Diciembre</p>
          </div>

          <div className="registro-section">
            <button className="btn-registrar-proyecto" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
              {mostrarFormulario ? '❌ Cancelar' : '📝 Registrar mi Proyecto'}
            </button>
          </div>

          {mostrarFormulario && (
            <div className="formulario-proyecto-card">
              <h2 className="formulario-titulo">🎄 Registra tu Proyecto de Navidad</h2>

              <div className="ideas-sugeridas">
                <h3 className="ideas-titulo">💡 Ideas de Proyectos Navidad</h3>
                <div className="ideas-grid">
                  {ideasNavidad.map((idea, index) => (
                    <button
                      key={index}
                      type="button"
                      className="idea-card"
                      onClick={() => seleccionarIdea(idea)}
                      disabled={enviando}
                    >
                      <span className="idea-nombre">{idea.nombre}</span>
                      <span className="idea-desc">{idea.descripcion}</span>
                    </button>
                  ))}
                </div>
                <p className="ideas-nota">👆 Haz clic en una idea para usarla, o crea la tuya abajo</p>
              </div>

              <form onSubmit={handleSubmit} className="formulario-proyecto">
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="nombre_proyecto">Nombre del Proyecto *</label>
                    <input type="text" id="nombre_proyecto" name="nombre_proyecto" value={formulario.nombre_proyecto} onChange={handleChange} placeholder="Ej: Diseño Navideño en Figma" disabled={enviando} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="descripcion">Descripción *</label>
                    <textarea id="descripcion" name="descripcion" value={formulario.descripcion} onChange={handleChange} placeholder="Describe tu proyecto (máx. 200 caracteres)" maxLength="200" rows="3" disabled={enviando} />
                    <span className="char-count">{formulario.descripcion.length}/200</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="link_figma">Link de Figma (Opcional)</label>
                    <input type="url" id="link_figma" name="link_figma" value={formulario.link_figma} onChange={handleChange} placeholder="https://www.figma.com/file/..." disabled={enviando} />
                  </div>
                </div>

                <div className="divider"><span>👤 Tus Datos</span></div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre_invitado">Tu Nombre *</label>
                    <input type="text" id="nombre_invitado" name="nombre_invitado" value={formulario.nombre_invitado} onChange={handleChange} placeholder="Juan Pérez" disabled={enviando} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email_invitado">Tu Email * (con el que te registraste al curso)</label>
                    <input type="email" id="email_invitado" name="email_invitado" value={formulario.email_invitado} onChange={handleChange} placeholder="tu@email.com" disabled={enviando} />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit-proyecto" disabled={enviando}>{enviando ? '⏳ Enviando...' : '✅ Registrar Proyecto'}</button>
                </div>
              </form>
            </div>
          )}

          <div className="proyectos-lista-section">
            <h2 className="seccion-titulo">📋 Proyectos Registrados - Navidad</h2>
            {cargando ? (
              <div className="loading"><div className="spinner"></div><p>Cargando proyectos...</p></div>
            ) : proyectosNavidad.length === 0 ? (
              <div className="empty-state"><p className="empty-icon">📦</p><p className="empty-message">Aún no hay proyectos</p><p className="empty-submessage">¡Sé el primero!</p></div>
            ) : (
              <div className="proyectos-grid">
                {proyectosNavidad.map((proyecto) => (
                  <div key={proyecto.id} className="proyecto-card">
                    <div className="proyecto-icon">🎄</div>
                    <h3 className="proyecto-nombre">{proyecto.nombre_proyecto}</h3>
                    <p className="proyecto-descripcion">{proyecto.descripcion}</p>
                    <div className="proyecto-footer">
                      <div className="proyecto-presentador"><span className="presentador-icon">👤</span><span className="presentador-nombre">{proyecto.presentador}</span></div>
                      {proyecto.link_figma && (
                        <a href={proyecto.link_figma} target="_blank" rel="noopener noreferrer" className="btn-ver-figma">
                          🎨 Ver en Figma
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {mostrarToast && (<div className={`toast toast-${toastTipo}`}>{toastMensaje}</div>)}
    </div>
  );
};

export default Proyectos;
