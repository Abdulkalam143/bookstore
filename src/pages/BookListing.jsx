import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, LayoutGrid, List, BookOpen } from "lucide-react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";

export default function BookListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    maxPrice: 50,
    minRating: 0,
    sort: "default",
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [inputValue, setInputValue] = useState(searchQuery);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    if (cat) setFilters((f) => ({ ...f, category: cat }));
    if (search) { setSearchQuery(search); setInputValue(search); }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    if (inputValue) {
      setSearchParams({ search: inputValue });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (newFilters.category !== "All") {
      setSearchParams({ category: newFilters.category });
    } else {
      setSearchParams({});
    }
  };

  const filtered = useMemo(() => {
    let result = [...books];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    if (filters.category !== "All") {
      result = result.filter((b) => b.category === filters.category);
    }

    result = result.filter(
      (b) => b.price <= filters.maxPrice && b.rating >= filters.minRating
    );

    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, filters]);

  return (
    <div className="page books-page">
      {/* Page Header */}
      <div className="books-header">
        <div className="books-header__text">
          <h1 className="page-title">
            <BookOpen size={28} /> Browse Books
          </h1>
          <p className="page-subtitle">
            {filtered.length} book{filtered.length !== 1 ? "s" : ""} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        {/* Search Bar */}
        <form className="books-search" onSubmit={handleSearch} id="books-search-form">
          <Search size={18} className="books-search__icon" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search title, author..."
            id="books-search-input"
          />
          <button type="submit" className="btn btn--primary btn--sm">Search</button>
        </form>
      </div>

      <div className="books-layout">
        {/* Mobile filter toggle */}
        <button
          className="filter-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          id="filter-toggle"
        >
          Filters {sidebarOpen ? "▲" : "▼"}
        </button>

        <div className={`books-sidebar ${sidebarOpen ? "books-sidebar--open" : ""}`}>
          <FilterSidebar filters={filters} onChange={handleFilterChange} />
        </div>

        <div className="books-main">
          {/* View Toggle */}
          <div className="books-toolbar">
            <span className="books-count">{filtered.length} results</span>
            <div className="view-toggle">
              <button
                className={`view-btn ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
                id="grid-view-btn"
                title="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`view-btn ${view === "list" ? "active" : ""}`}
                onClick={() => setView("list")}
                id="list-view-btn"
                title="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">📚</span>
              <h3>No books found</h3>
              <p>Try adjusting your search or filters</p>
              <button
                className="btn btn--primary"
                onClick={() => {
                  setSearchQuery("");
                  setInputValue("");
                  setFilters({ category: "All", maxPrice: 50, minRating: 0, sort: "default" });
                  setSearchParams({});
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={view === "grid" ? "books-grid" : "books-list"}>
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
