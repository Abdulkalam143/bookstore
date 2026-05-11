import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Award, ChevronRight } from "lucide-react";
import { getFeaturedBooks, categories } from "../data/books";
import BookCard from "../components/BookCard";

const stats = [
  { label: "Books Available", value: "20,000+" },
  { label: "Happy Readers", value: "150K+" },
  { label: "Authors", value: "8,000+" },
  { label: "Categories", value: "50+" },
];

const catIcons = { Fiction: "📖", "Non-Fiction": "📰", Science: "🔬", History: "🏛️", Fantasy: "🧙", Mystery: "🔍", Biography: "👤", "Self-Help": "🌱" };

export default function Home() {
  const featured = getFeaturedBooks();

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg-orbs">
          <div className="orb orb--1" />
          <div className="orb orb--2" />
          <div className="orb orb--3" />
        </div>
        <div className="hero__content">
          <div className="hero__badge">
            <Sparkles size={14} /> New arrivals every week
          </div>
          <h1 className="hero__title">
            Discover Your Next<br />
            <span className="hero__title-gradient">Great Read</span>
          </h1>
          <p className="hero__subtitle">
            Explore thousands of books across every genre. From timeless classics to contemporary bestsellers — your next adventure is just a page away.
          </p>
          <div className="hero__cta">
            <Link to="/books" className="btn btn--primary btn--lg" id="hero-browse-btn">
              Browse Library <ArrowRight size={18} />
            </Link>
            <Link to="/books?category=Fiction" className="btn btn--ghost btn--lg">
              Explore Fiction
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__books-stack">
            {featured.slice(0, 3).map((book, i) => (
              <img
                key={book.id}
                src={book.cover}
                alt={book.title}
                className={`hero__book-img hero__book-img--${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-card__value">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="section">
        <div className="section__header">
          <div>
            <div className="section__badge">
              <TrendingUp size={14} /> Featured
            </div>
            <h2 className="section__title">Trending This Week</h2>
          </div>
          <Link to="/books" className="section__see-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="books-grid">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="section__header">
          <div>
            <div className="section__badge">
              <Award size={14} /> Browse
            </div>
            <h2 className="section__title">Shop by Category</h2>
          </div>
        </div>
        <div className="categories-grid">
          {categories.filter((c) => c !== "All").map((cat) => (
            <Link
              key={cat}
              to={`/books?category=${encodeURIComponent(cat)}`}
              className="category-card"
              id={`home-cat-${cat.toLowerCase()}`}
            >
              <span className="category-card__icon">{catIcons[cat] || "📚"}</span>
              <span className="category-card__name">{cat}</span>
              <ChevronRight size={16} className="category-card__arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner__content">
          <h2>Start Your Reading Journey Today</h2>
          <p>Join over 150,000 readers who trust Bibliophile for their next great book.</p>
          <Link to="/auth" className="btn btn--primary btn--lg" id="cta-signup-btn">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
