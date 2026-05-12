import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search, BookOpen, User, LogOut, Menu, X, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <BookOpen size={26} />
          <span>Bibliophile</span>
        </Link>

        {/* Desktop Search */}
        <form className="navbar__search" onSubmit={handleSearch}>
          <Search size={18} className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Search books, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="navbar-search"
          />
        </form>

        {/* Desktop Nav */}
        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/books" className={`navbar__link ${location.pathname === "/books" ? "active" : ""}`}>
            Browse
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="navbar__cart" id="wishlist-button" style={{ marginRight: '-0.5rem' }}>
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="navbar__cart-badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar__cart" id="cart-button">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="navbar__user" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="navbar__avatar">
                {user.name[0].toUpperCase()}
              </div>
              {userMenuOpen && (
                <div className="navbar__user-menu">
                  <div className="navbar__user-info">
                    <span className="navbar__user-name">{user.name}</span>
                    <span className="navbar__user-email">{user.email}</span>
                  </div>
                  <button
                    className="navbar__user-logout"
                    onClick={(e) => { e.stopPropagation(); logout(); setUserMenuOpen(false); }}
                  >
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="btn btn--primary btn--sm" id="login-button">
              <User size={16} /> Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile">
          <form className="navbar__mobile-search" onSubmit={handleSearch}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link to="/" className="navbar__mobile-link">Home</Link>
          <Link to="/books" className="navbar__mobile-link">Browse Books</Link>
          <Link to="/wishlist" className="navbar__mobile-link">
            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
          <Link to="/cart" className="navbar__mobile-link">
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          {user ? (
            <button className="navbar__mobile-link" onClick={logout}>
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <Link to="/auth" className="navbar__mobile-link">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
