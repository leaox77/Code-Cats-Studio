import { useState } from 'react';

const ProductCard = ({ nombre, precio, imagen, onCantidadChange, darkMode }) => {
  const [cantidad, setCantidad] = useState(0);

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCantidad(value);
    onCantidadChange(value);
  };

  const incrementar = () => {
    const nuevaCantidad = cantidad + 1;
    setCantidad(nuevaCantidad);
    onCantidadChange(nuevaCantidad);
  };

  const decrementar = () => {
    const nuevaCantidad = Math.max(0, cantidad - 1);
    setCantidad(nuevaCantidad);
    onCantidadChange(nuevaCantidad);
  };

  return (
    <div className={`product-card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="product-image">
        <img src={imagen} alt={nombre} />
      </div>
      <h3 className="product-name">{nombre}</h3>
      <p className="product-price">Bs.{precio.toLocaleString()}</p>
      <div className="quantity-control">
        <label htmlFor={`qty-${nombre}`}>Cantidad:</label>
        <div className="quantity-selector">
          <button 
            className="quantity-btn" 
            onClick={decrementar}
            disabled={cantidad === 0}
          >
            -
          </button>
          <input
            id={`qty-${nombre}`}
            className="quantity-input"
            type="number"
            min="0"
            value={cantidad}
            onChange={handleChange}
          />
          <button 
            className="quantity-btn" 
            onClick={incrementar}
          >
            +
          </button>
        </div>
      </div>
      {cantidad > 0 && (
        <p className="subtotal">Subtotal: Bs.{(precio * cantidad).toLocaleString()}</p>
      )}
    </div>
  );
}

export default ProductCard;
