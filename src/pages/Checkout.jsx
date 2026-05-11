import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Check, CreditCard, Truck, ShieldCheck } from "lucide-react";

const steps = ["Shipping", "Payment", "Review"];

const initShipping = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "", zip: "", country: "US",
};

const initPayment = {
  cardName: "", cardNumber: "", expiry: "", cvv: "",
};

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState(initShipping);
  const [payment, setPayment] = useState(initPayment);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(`ORD-${Date.now().toString().slice(-8)}`);

  const shippingFee = cartTotal > 35 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingFee + tax;

  const validateShipping = () => {
    const errs = {};
    if (!shipping.firstName.trim()) errs.firstName = "Required";
    if (!shipping.lastName.trim()) errs.lastName = "Required";
    if (!shipping.email.trim() || !shipping.email.includes("@")) errs.email = "Valid email required";
    if (!shipping.address.trim()) errs.address = "Required";
    if (!shipping.city.trim()) errs.city = "Required";
    if (!shipping.zip.trim()) errs.zip = "Required";
    return errs;
  };

  const validatePayment = () => {
    const errs = {};
    if (!payment.cardName.trim()) errs.cardName = "Required";
    if (payment.cardNumber.replace(/\s/g, "").length < 16) errs.cardNumber = "Enter 16-digit card number";
    if (!payment.expiry.match(/^\d{2}\/\d{2}$/)) errs.expiry = "Format: MM/YY";
    if (payment.cvv.length < 3) errs.cvv = "3-4 digits required";
    return errs;
  };

  const handleNext = () => {
    if (step === 0) {
      const errs = validateShipping();
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    if (step === 1) {
      const errs = validatePayment();
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="page order-success">
        <div className="order-success__card">
          <div className="order-success__icon">
            <Check size={42} />
          </div>
          <h1>Order Placed!</h1>
          <p className="order-success__sub">Thank you for your purchase, <strong>{shipping.firstName}</strong>!</p>
          <div className="order-success__id">Order #{orderId}</div>
          <p className="order-success__msg">
            A confirmation email will be sent to <strong>{shipping.email}</strong>.
            Your books will arrive in 3–5 business days.
          </p>
          <div className="order-success__actions">
            <button className="btn btn--primary" onClick={() => navigate("/")}>
              Back to Home
            </button>
            <button className="btn btn--ghost" onClick={() => navigate("/books")}>
              Shop More Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <h1 className="page-title">Checkout</h1>

      {/* Steps */}
      <div className="checkout-steps">
        {steps.map((s, i) => (
          <div key={s} className={`checkout-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
            <div className="checkout-step__num">
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        {/* Form */}
        <div className="checkout-form-wrap">
          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="checkout-section">
              <div className="checkout-section__header">
                <Truck size={20} /> Shipping Information
              </div>
              <div className="form-grid">
                {[
                  { key: "firstName", label: "First Name", placeholder: "John", half: true },
                  { key: "lastName", label: "Last Name", placeholder: "Doe", half: true },
                  { key: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
                  { key: "phone", label: "Phone (optional)", placeholder: "+1 555 0123", type: "tel" },
                  { key: "address", label: "Street Address", placeholder: "123 Book Lane" },
                  { key: "city", label: "City", placeholder: "New York", half: true },
                  { key: "zip", label: "ZIP Code", placeholder: "10001", half: true },
                ].map(({ key, label, placeholder, type = "text", half }) => (
                  <div key={key} className={`form-group ${half ? "form-group--half" : ""}`}>
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      className={`form-input ${errors[key] ? "form-input--error" : ""}`}
                      placeholder={placeholder}
                      value={shipping[key]}
                      onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                      id={`shipping-${key}`}
                    />
                    {errors[key] && <span className="form-error">{errors[key]}</span>}
                  </div>
                ))}
              </div>
              <button className="btn btn--primary btn--full mt-4" onClick={handleNext} id="shipping-next">
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="checkout-section">
              <div className="checkout-section__header">
                <CreditCard size={20} /> Payment Information
              </div>
              <div className="secure-badge">
                <ShieldCheck size={16} /> Your payment info is encrypted and secure
              </div>
              <div className="form-grid">
                {[
                  { key: "cardName", label: "Name on Card", placeholder: "John Doe" },
                  {
                    key: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456",
                    transform: formatCard,
                  },
                  { key: "expiry", label: "Expiry Date", placeholder: "MM/YY", half: true, transform: formatExpiry },
                  { key: "cvv", label: "CVV", placeholder: "123", half: true, maxLength: 4 },
                ].map(({ key, label, placeholder, half, transform, maxLength, type = "text" }) => (
                  <div key={key} className={`form-group ${half ? "form-group--half" : ""}`}>
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      className={`form-input ${errors[key] ? "form-input--error" : ""}`}
                      placeholder={placeholder}
                      value={payment[key]}
                      maxLength={maxLength}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          [key]: transform ? transform(e.target.value) : e.target.value,
                        })
                      }
                      id={`payment-${key}`}
                    />
                    {errors[key] && <span className="form-error">{errors[key]}</span>}
                  </div>
                ))}
              </div>
              <div className="checkout-nav">
                <button className="btn btn--ghost" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn--primary" onClick={handleNext} id="payment-next">
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="checkout-section">
              <div className="checkout-section__header">Review Your Order</div>
              <div className="review-section">
                <h3 className="review-heading">Shipping to</h3>
                <p className="review-text">
                  {shipping.firstName} {shipping.lastName}<br />
                  {shipping.address}, {shipping.city} {shipping.zip}<br />
                  {shipping.email}
                </p>
              </div>
              <div className="review-section">
                <h3 className="review-heading">Payment</h3>
                <p className="review-text">
                  Card ending in {payment.cardNumber.slice(-4)}
                </p>
              </div>
              <div className="review-items">
                {items.map((item) => (
                  <div key={item.id} className="review-item">
                    <img src={item.cover} alt={item.title} className="review-item__img" />
                    <div className="review-item__info">
                      <span className="review-item__title">{item.title}</span>
                      <span className="review-item__qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="review-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-nav">
                <button className="btn btn--ghost" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="btn btn--primary"
                  onClick={handlePlaceOrder}
                  id="place-order-btn"
                >
                  Place Order — ${total.toFixed(2)} 🎉
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary">
          <h3 className="checkout-summary__title">Your Order</h3>
          <div className="checkout-summary__items">
            {items.map((item) => (
              <div key={item.id} className="checkout-summary__item">
                <img src={item.cover} alt={item.title} className="checkout-summary__img" />
                <div className="checkout-summary__item-info">
                  <span className="checkout-summary__item-title">{item.title}</span>
                  <span className="checkout-summary__item-qty">×{item.quantity}</span>
                </div>
                <span className="checkout-summary__item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary__totals">
            <div className="checkout-summary__row">
              <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Tax</span><span>${tax.toFixed(2)}</span>
            </div>
            <div className="checkout-summary__total">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
