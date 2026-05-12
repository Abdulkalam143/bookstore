import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import BookCard from "../components/BookCard";

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="page empty-state">
        <Heart size={64} strokeWidth={1} className="empty-state__icon" style={{ color: 'var(--text-secondary)' }} />
        <h2>Your Wishlist is Empty</h2>
        <p>Save books you'd like to read later by clicking the heart icon on any book.</p>
        <Link to="/books" className="btn btn--primary mt-4">
          Browse Library
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h1 className="page-title">Your Wishlist</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>{wishlist.length} {wishlist.length === 1 ? "book" : "books"} saved</p>
        </div>
        <button 
          className="btn btn--ghost" 
          onClick={clearWishlist}
          style={{ color: 'var(--danger-color)' }}
        >
          <Trash2 size={16} /> Clear All
        </button>
      </div>

      <div className="books-grid">
        {wishlist.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
