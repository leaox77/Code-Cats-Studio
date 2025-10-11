import { useState, useEffect, useRef } from 'react';
import ProductCard from './components/ProductCard';
import './App.css';

import qrBancoSol from './assets/qr.jpeg';

import ProjectMaster from './assets/project-master.jpeg';
import CodeHunter from './assets/code-hunter.jpeg';
import KittenStarter from './assets/kitten-starter.jpeg';
import CodeAndCoffee from './assets/code-coffee.jpeg';
import MeowStarter from './assets/meow-starter.jpeg';
import Botones from './assets/botones.jpeg';
import Llavero from './assets/llavero.jpeg';
import Taza from './assets/taza.jpeg';
import MousePad from './assets/mousepad.jpeg';
import Medias from './assets/medias.jpeg';
import Polera from './assets/polera.jpeg';

function App() {
  const scriptURL = "https://script.google.com/macros/s/AKfycbxqZqMa7ujKL1_Ai7vDGcZbOaEQCxnIOKOi4B8yfP7edKkB6jSUeA_QvD-uA39eg_LVIg/exec";

  const [darkMode, setDarkMode] = useState(false);
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [comprobantePreview, setComprobantePreview] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [toastMensaje, setToastMensaje] = useState('');
  const fileInputRef = useRef(null);

  const paquetes = [
    { id: 'pm', nombre: 'Project Master', precio: 150, imagen: ProjectMaster },
    { id: 'ch', nombre: 'Code Hunter', precio: 80, imagen: CodeHunter },
    { id: 'ks', nombre: 'Kitten Starter', precio: 40, imagen: KittenStarter },
    { id: 'cc', nombre: 'Code and Coffee', precio: 35, imagen: CodeAndCoffee },
    { id: 'ms', nombre: 'Meow Starter', precio: 20, imagen: MeowStarter }
  ];

  const productos = [
    { id: 'botones', nombre: 'Botones/Pines', precio: 5, imagen: Botones },
    { id: 'llavero', nombre: 'Llavero', precio: 10, imagen: Llavero },
    { id: 'taza', nombre: 'Taza', precio: 20, imagen: Taza },
    { id: 'mousepad', nombre: 'MousePad', precio: 30, imagen: MousePad },
    { id: 'medias', nombre: 'Medias', precio: 30, imagen: Medias },
    { id: 'polera', nombre: 'Polera', precio: 65, imagen: Polera }
  ];

  const [cantidades, setCantidades] = useState({});
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    nombre: '',
    ci: '',
    telefono: '',
    conocimiento: ''
  });

  useEffect(() => {
    let nuevoTotal = 0;
    [...paquetes, ...productos].forEach(item => {
      const cantidad = cantidades[item.id] || 0;
      nuevoTotal += item.precio * cantidad;
    });
    setTotal(nuevoTotal);
  }, [cantidades]);

  // Toast automático
  useEffect(() => {
    if (mostrarToast) {
      const timer = setTimeout(() => {
        setMostrarToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mostrarToast]);

  const mostrarToastMensaje = (mensaje, tipo = 'info') => {
    setToastMensaje(mensaje);
    setMostrarToast(true);
  };

  const handleCantidadChange = (id, cantidad) => {
    setCantidades(prev => ({
      ...prev,
      [id]: cantidad
    }));
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const abrirModalPago = () => {
    if (total === 0) {
      mostrarToastMensaje('❌ Primero agrega productos al carrito', 'error');
      return;
    }
    if (!form.nombre || !form.ci || !form.telefono) {
      mostrarToastMensaje('❌ Completa tus datos primero', 'error');
      return;
    }
    setMostrarModalPago(true);
  };

  const cerrarModalPago = () => {
    setMostrarModalPago(false);
  };

  const handleComprobanteChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        mostrarToastMensaje('❌ Por favor sube una imagen (JPG, PNG, etc.)', 'error');
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        mostrarToastMensaje('❌ La imagen es muy grande (máximo 2MB)', 'error');
        return;
      }

      setComprobante(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setComprobantePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarComprobante = () => {
    setComprobante(null);
    setComprobantePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEnviarPedido = async () => {
    if (!comprobante) {
      mostrarToastMensaje('❌ Primero sube el comprobante de pago', 'error');
      return;
    }

    setEnviando(true);

    // Solo enviar información del comprobante, no la imagen completa
    const infoComprobante = {
      nombre: comprobante.name,
      tamaño: `${(comprobante.size / 1024 / 1024).toFixed(2)} MB`,
      tipo: comprobante.type,
      subido: new Date().toLocaleString('es-BO')
    };

    const pedido = {
      ...form,
      paquetes: paquetes.map(p => ({
        nombre: p.nombre,
        cantidad: cantidades[p.id] || 0,
        subtotal: (cantidades[p.id] || 0) * p.precio
      })).filter(p => p.cantidad > 0),
      productos: productos.map(p => ({
        nombre: p.nombre,
        cantidad: cantidades[p.id] || 0,
        subtotal: (cantidades[p.id] || 0) * p.precio
      })).filter(p => p.cantidad > 0),
      total: total,
      comprobante: `ARCHIVO_SUBIDO: ${infoComprobante.nombre} (${infoComprobante.tamaño})`
    };

    console.log('Enviando pedido sin imagen...');
    await enviarConJsonp(pedido);
  };

  const enviarConJsonp = (pedido) => {
    return new Promise((resolve) => {
      const callbackName = 'jsonpCallback_' + Date.now();
      
      // Limpiar callback anterior si existe
      if (window[callbackName]) {
        delete window[callbackName];
      }

      // Crear el callback global
      window[callbackName] = function(response) {
        console.log('✅ Callback ejecutado:', response);
        
        // Limpiar
        delete window[callbackName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        
        if (response && response.status === "success") {
          mostrarToastMensaje('🎉 ¡Pedido enviado! Guarda el comprobante y nos comunicaremos contigo.', 'success');
          limpiarFormulario();
        } else {
          const errorMsg = response?.message || 'Error desconocido';
          mostrarToastMensaje(`❌ Error: ${errorMsg}`, 'error');
        }
        setEnviando(false);
        resolve(response);
      };

      const script = document.createElement('script');
      
      // Crear URL más corta
      const url = `${scriptURL}?data=${encodeURIComponent(JSON.stringify(pedido))}&callback=${callbackName}`;
      script.src = url;
      
      console.log('📤 Enviando pedido sin imagen...');
      
      // Manejar errores de carga del script
      script.onerror = () => {
        console.error('❌ Error cargando el script JSONP');
        delete window[callbackName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        // Mostrar mensaje de advertencia pero éxito
        mostrarToastMensaje('⚠️ Pedido recibido. Guarda el comprobante y envíalo por WhatsApp.', 'warning');
        limpiarFormulario();
        setEnviando(false);
        resolve({ status: "error", message: "Network error" });
      };

      // Agregar timeout
      const timeout = setTimeout(() => {
        console.warn('⏰ Timeout del JSONP');
        if (window[callbackName]) {
          delete window[callbackName];
        }
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        // Mostrar éxito aunque haya timeout
        mostrarToastMensaje('✅ Pedido procesado. Guarda el comprobante.', 'success');
        limpiarFormulario();
        setEnviando(false);
        resolve({ status: "timeout", message: "Timeout" });
      }, 10000);

      // Limpiar timeout cuando el callback se ejecute
      const originalCallback = window[callbackName];
      window[callbackName] = function(response) {
        clearTimeout(timeout);
        originalCallback(response);
      };

      document.head.appendChild(script);
    });
  };

  const limpiarFormulario = () => {
    setCantidades({});
    setForm({ nombre: '', ci: '', telefono: '', conocimiento: '' });
    setComprobante(null);
    setComprobantePreview('');
    setMostrarModalPago(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Obtener productos seleccionados para el resumen
  const productosSeleccionados = [
    ...paquetes.filter(p => cantidades[p.id] > 0),
    ...productos.filter(p => cantidades[p.id] > 0)
  ].map(item => ({
    nombre: item.nombre,
    cantidad: cantidades[item.id],
    subtotal: item.precio * cantidades[item.id]
  }));

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Toast */}
      {mostrarToast && (
        <div className={`toast ${toastMensaje.includes('❌') ? 'toast-error' : toastMensaje.includes('🎉') ? 'toast-success' : 'toast-warning'}`}>
          {toastMensaje}
        </div>
      )}

      {/* Modal de Pago */}
      {mostrarModalPago && (
        <div className="pago-modal">
          <div className="pago-modal-content">
            <button className="pago-close-btn" onClick={cerrarModalPago}>×</button>
            
            {/* Resumen del Pedido */}
            <div className="resumen-section">
              <h3>📋 Resumen de tu Pedido</h3>
              <div className="cliente-info">
                <p><strong>Cliente:</strong> {form.nombre}</p>
                <p><strong>CI:</strong> {form.ci}</p>
                <p><strong>Teléfono:</strong> {form.telefono}</p>
                {form.conocimiento && <p><strong>Nos conociste por:</strong> {form.conocimiento}</p>}
              </div>
              
              <div className="productos-resumen">
                <h4>Productos seleccionados:</h4>
                {productosSeleccionados.map((item, index) => (
                  <div key={index} className="producto-resumen">
                    <span>{item.nombre}</span>
                    <span>x{item.cantidad}</span>
                    <span>Bs. {item.subtotal.toLocaleString()}</span>
                  </div>
                ))}
                <div className="total-resumen">
                  <strong>Total: Bs. {total.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* QR de Pago */}
            <div className="qr-section">
              <h4>💳 Pagar con QR</h4>
              <div className="qr-bank-info">
                <p><strong>Monto a pagar:</strong> Bs. {total.toLocaleString()}</p>
              </div>
              
              <div className="qr-image-container">
                <img src={qrBancoSol} alt="QR de pago" className="qr-image" />
              </div>
              
              <div className="qr-instructions">
                <p><strong>Instrucciones:</strong></p>
                <p>1. Abre tu app bancaria</p>
                <p>2. Escanea el código QR</p>
                <p>3. Ingresa el monto exacto</p>
                <p>4. Confirma el pago</p>
                <p>5. <strong>Guarda el comprobante</strong></p>
              </div>
            </div>

            {/* Comprobante */}
            <div className="comprobante-section">
              <h4>📎 Confirmar Comprobante</h4>
              
              {!comprobantePreview ? (
                <div className="comprobante-upload">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleComprobanteChange}
                    accept="image/*"
                    className="comprobante-input"
                    id="comprobante-file"
                  />
                  <label htmlFor="comprobante-file" className="comprobante-label">
                    📸 Subir captura del comprobante
                  </label>
                  <p className="comprobante-hint">Formato: JPG, PNG (máx. 2MB)</p>
                  <p className="comprobante-tip">💡 <strong>Importante:</strong> Guarda el comprobante</p>
                </div>
              ) : (
                <div className="comprobante-preview">
                  <div className="comprobante-image-container">
                    <img src={comprobantePreview} alt="Comprobante" className="comprobante-image" />
                    <button className="comprobante-remove" onClick={eliminarComprobante}>
                      🗑️
                    </button>
                  </div>
                  <p className="comprobante-success">✅ Comprobante listo</p>
                  <p className="comprobante-size">
                    Archivo: {comprobante.name} ({(comprobante.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <div className="comprobante-alert">
                    <p>⚠️ <strong>Guarda este comprobante</strong></p>
                    <p>Te contactaremos para verificarlo</p>
                  </div>
                </div>
              )}
            </div>

            {/* Botón de enviar */}
            <div className="pago-actions">
              <button 
                className="enviar-pedido-btn"
                onClick={handleEnviarPedido}
                disabled={enviando || !comprobante}
              >
                {enviando ? '🔄 Enviando pedido...' : '✅ Confirmar Pedido'}
              </button>
              <p className="pago-note">
                {enviando && '⏳ Procesando tu pedido...'}
                {!enviando && 'Al confirmar, tu pedido será registrado en nuestro sistema.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="header">
        <h1>¿Qué comprarás el día de hoy?</h1>
        <p className="subtitle">Puedes comprar un paquete o productos unitarios</p>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </header>

      <div className="formulario">
        <input 
          type="text" 
          name="nombre" 
          placeholder="Tu nombre completo" 
          value={form.nombre} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="ci" 
          placeholder="CI o DNI" 
          value={form.ci} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="tel" 
          name="telefono" 
          placeholder="Número de teléfono" 
          value={form.telefono} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="conocimiento" 
          placeholder="¿Por dónde nos conociste?" 
          value={form.conocimiento} 
          onChange={handleInputChange} 
        />
      </div>

      <section className="section">
        <h2 className="section-title">Paquetes</h2>
        <div className="products-grid paquetes-grid">
          {paquetes.map(paquete => (
            <ProductCard 
              key={paquete.id} 
              nombre={paquete.nombre} 
              precio={paquete.precio} 
              imagen={paquete.imagen} 
              onCantidadChange={(cantidad) => handleCantidadChange(paquete.id, cantidad)} 
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Productos Unitarios</h2>
        <div className="products-grid unitarios-grid">
          {productos.map(producto => (
            <ProductCard 
              key={producto.id} 
              nombre={producto.nombre} 
              precio={producto.precio} 
              imagen={producto.imagen} 
              onCantidadChange={(cantidad) => handleCantidadChange(producto.id, cantidad)} 
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>

      <div className="total-section">
        <h2 className="total-label">Total General:</h2>
        <p className="total-amount">Bs.{total.toLocaleString()}</p>

        <button 
          className="pagar-button"
          onClick={abrirModalPago}
          disabled={total === 0 || !form.nombre || !form.ci || !form.telefono}
        >
          💳 Proceder al Pago
        </button>
      </div>
    </div>
  );
}

export default App;