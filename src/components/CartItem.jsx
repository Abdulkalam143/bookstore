import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item" id={`cart-item-${item.id}`}>
      <Link to={`/books/${item.id}`} className="cart-item__cover-link">
        <img src={item.cover} alt={item.title} className="cart-item__cover" />
      </Link>
      <div className="cart-item__info">
        <Link to={`/books/${item.id}`} className="cart-item__title">{item.title}</Link>
        <p className="cart-item__author">by {item.author}</p>
        <p className="cart-item__category">{item.category}</p>
        <div className="cart-item__price-row">
          <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
          <span className="cart-item__unit-price">${item.price.toFixed(2)} each</span>
        </div>
      </div>
      <div className="cart-item__controls">
        <div className="quantity-control">
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            id={`decrease-qty-${item.id}`}
          >
            <Minus size={14} />
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            id={`increase-qty-${item.id}`}
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          className="cart-item__remove"
          onClick={() => removeFromCart(item.id)}
          id={`remove-item-${item.id}`}
          title="Remove item"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}
