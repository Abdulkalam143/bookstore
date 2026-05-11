import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal > 35 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  return (
    <div className="page cart-page">
      <div className="cart-header">
        <h1 className="page-title">
          <ShoppingBag size={28} /> Shopping Cart
        </h1>
        {items.length > 0 && (
          <button
            className="btn btn--ghost btn--sm"
            onClick={clearCart}
            id="clear-cart-btn"
          >
            <Trash2 size={15} /> Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🛒</span>
          <h2>Your Cart is Empty</h2>
          <p>Add some books to get started!</p>
          <Link to="/books" className="btn btn--primary" id="browse-books-from-cart">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            <div className="cart-items__header">
              <span>{items.length} item{items.length !== 1 ? "s" : ""} in your cart</span>
            </div>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>
            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text--success" : ""}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {cartTotal < 35 && (
                <p className="cart-summary__free-ship">
                  Add ${(35 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="cart-summary__row">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn--primary btn--full cart-summary__checkout"
              onClick={() => navigate("/checkout")}
              id="proceed-to-checkout"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <Link to="/books" className="cart-summary__continue">
              ← Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="cart-trust">
              <span>🔒 Secure checkout</span>
              <span>📦 Free returns</span>
              <span>⭐ 150K+ readers</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
