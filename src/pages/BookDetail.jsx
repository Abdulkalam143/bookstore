import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, ShoppingCart, ArrowLeft, BookOpen, Calendar,
  Hash, Building, Check, Share2, Heart
} from "lucide-react";
import { getBookById, books } from "../data/books";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import BookCard from "../components/BookCard";

export default function BookDetail() {
  const { id } = useParams();
  const book = getBookById(id);
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [tab, setTab] = useState("description");

  if (!book) {
    return (
      <div className="page empty-state">
        <span className="empty-state__icon">📖</span>
        <h2>Book Not Found</h2>
        <p>The book you're looking for doesn't exist.</p>
        <Link to="/books" className="btn btn--primary">Browse Books</Link>
      </div>
    );
  }

  const related = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(book);
    navigate("/cart");
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={i < Math.floor(rating) ? "star--filled" : i < rating ? "star--half" : "star--empty"}
      />
    ));

  const mockReviews = [
    { name: "Sarah M.", rating: 5, text: "Absolutely captivating! Couldn't put it down." },
    { name: "James K.", rating: 4, text: "A wonderful read with deep characters and vivid storytelling." },
    { name: "Priya R.", rating: 5, text: "One of my all-time favorites. Highly recommend!" },
  ];

  return (
    <div className="page book-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/books">Books</Link>
        <span>/</span>
        <Link to={`/books?category=${book.category}`}>{book.category}</Link>
        <span>/</span>
        <span>{book.title}</span>
      </nav>

      {/* Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* Main Detail */}
      <div className="book-detail">
        <div className="book-detail__left">
          <div className="book-detail__cover-wrap">
            <img src={book.cover} alt={book.title} className="book-detail__cover" />
            <div className="book-detail__category-badge">{book.category}</div>
          </div>
          {/* Actions (mobile) */}
          <div className="book-detail__actions book-detail__actions--mobile">
            <button
              className={`btn btn--primary btn--full ${added || isInCart(book.id) ? "btn--success" : ""}`}
              onClick={handleAddToCart}
              id="detail-add-to-cart"
            >
              {added || isInCart(book.id) ? (
                <><Check size={18} /> In Cart</>
              ) : (
                <><ShoppingCart size={18} /> Add to Cart</>
              )}
            </button>
            <button
              className="btn btn--secondary btn--full"
              onClick={handleBuyNow}
              id="detail-buy-now"
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="book-detail__right">
          <h1 className="book-detail__title">{book.title}</h1>
          <p className="book-detail__author">by <strong>{book.author}</strong></p>

          <div className="book-detail__rating">
            <div className="book-detail__stars">{renderStars(book.rating)}</div>
            <span className="book-detail__rating-score">{book.rating}</span>
            <span className="book-detail__reviews">({book.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="book-detail__price">${book.price.toFixed(2)}</div>

          {/* Metadata */}
          <div className="book-detail__meta">
            <div className="book-meta-item">
              <BookOpen size={16} /> <span>{book.pages} pages</span>
            </div>
            <div className="book-meta-item">
              <Calendar size={16} /> <span>{book.year}</span>
            </div>
            <div className="book-meta-item">
              <Building size={16} /> <span>{book.publisher}</span>
            </div>
            <div className="book-meta-item">
              <Hash size={16} /> <span>ISBN: {book.isbn}</span>
            </div>
          </div>

          {/* Actions (desktop) */}
          <div className="book-detail__actions book-detail__actions--desktop">
            <button
              className={`btn btn--primary ${added || isInCart(book.id) ? "btn--success" : ""}`}
              onClick={handleAddToCart}
              id="detail-add-to-cart-desktop"
            >
              {added || isInCart(book.id) ? (
                <><Check size={18} /> In Cart</>
              ) : (
                <><ShoppingCart size={18} /> Add to Cart</>
              )}
            </button>
            <button className="btn btn--secondary" onClick={handleBuyNow} id="detail-buy-now-desktop">
              Buy Now — ${book.price.toFixed(2)}
            </button>
            <div className="book-detail__icon-actions">
              <button
                className={`icon-btn ${wishlist ? "icon-btn--active" : ""}`}
                onClick={() => setWishlist(!wishlist)}
                title="Add to wishlist"
              >
                <Heart size={20} fill={wishlist ? "currentColor" : "none"} />
              </button>
              <button
                className="icon-btn"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                title="Share"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="book-detail__tabs">
            {["description", "reviews"].map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
                id={`tab-${t}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="book-detail__tab-content">
            {tab === "description" && (
              <p className="book-detail__description">{book.description}</p>
            )}
            {tab === "reviews" && (
              <div className="book-reviews">
                {mockReviews.map((r, i) => (
                  <div key={i} className="review-card">
                    <div className="review-card__header">
                      <div className="review-card__avatar">{r.name[0]}</div>
                      <div>
                        <span className="review-card__name">{r.name}</span>
                        <div className="review-card__stars">
                          {Array.from({ length: 5 }, (_, j) => (
                            <Star
                              key={j}
                              size={13}
                              className={j < r.rating ? "star--filled" : "star--empty"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="review-card__text">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">More in {book.category}</h2>
            <Link to={`/books?category=${book.category}`} className="section__see-all">
              View All
            </Link>
          </div>
          <div className="books-grid">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
