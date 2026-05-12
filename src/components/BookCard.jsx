import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

export default function BookCard({ book }) {
  const { items, addToCart, isInCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.id === book.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={13}
        className={i < Math.floor(rating) ? "star--filled" : i < rating ? "star--half" : "star--empty"}
      />
    ));
  };

  return (
    <Link to={`/books/${book.id}`} className="book-card" id={`book-card-${book.id}`}>
      <div className="book-card__cover-wrap">
        <img
          src={book.cover}
          alt={book.title}
          className="book-card__cover"
          loading="lazy"
        />
        <div className="book-card__overlay">
          <button
            className={`book-card__wishlist ${isInWishlist(book.id) ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); toggleWishlist(book); }}
            title="Add to wishlist"
          >
            <Heart size={18} fill={isInWishlist(book.id) ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="book-card__category">{book.category}</div>
      </div>
      <div className="book-card__info">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">by {book.author}</p>
        <div className="book-card__rating">
          <div className="book-card__stars">{renderStars(book.rating)}</div>
          <span className="book-card__rating-text">
            {book.rating} ({book.reviews.toLocaleString()})
          </span>
        </div>
        <div className="book-card__footer">
          <span className="book-card__price">${book.price.toFixed(2)}</span>
          {cartItem ? (
            <div className="quantity-control" onClick={(e) => e.preventDefault()}>
              <button
                className="quantity-btn"
                onClick={(e) => { e.preventDefault(); updateQuantity(book.id, cartItem.quantity - 1); }}
              >
                <Minus size={14} />
              </button>
              <span className="quantity-value">{cartItem.quantity}</span>
              <button
                className="quantity-btn"
                onClick={(e) => { e.preventDefault(); updateQuantity(book.id, cartItem.quantity + 1); }}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              className={`btn btn--primary btn--sm book-card__add ${added ? "btn--success" : ""}`}
              onClick={handleAddToCart}
              id={`add-to-cart-${book.id}`}
            >
              <ShoppingCart size={14} />
              {added ? "Added!" : "Add"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
