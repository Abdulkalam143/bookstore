import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookListing from "./pages/BookListing";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import "./App.css";

function ScrollToTop() {
  const { pathname } = window.location;
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookListing />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </main>
            <footer className="footer">
              <div className="footer__content">
                <div className="footer__brand">
                  <span className="footer__logo">📚 Bibliophile</span>
                  <p>Your digital library for discovering extraordinary books.</p>
                </div>
                <div className="footer__links">
                  <div className="footer__col">
                    <h4>Browse</h4>
                    <a href="/books">All Books</a>
                    <a href="/books?category=Fiction">Fiction</a>
                    <a href="/books?category=Non-Fiction">Non-Fiction</a>
                    <a href="/books?category=Science">Science</a>
                  </div>
                  <div className="footer__col">
                    <h4>Account</h4>
                    <a href="/auth">Sign In</a>
                    <a href="/auth">Register</a>
                    <a href="/cart">My Cart</a>
                  </div>
                </div>
              </div>
              <div className="footer__bottom">
                <span>© 2025 Bibliophile. All rights reserved.</span>
                <span>Made with ❤️ for book lovers</span>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
