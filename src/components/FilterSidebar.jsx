import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { categories } from "../data/books";

export default function FilterSidebar({ filters, onChange }) {
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const toggle = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleCategory = (cat) => onChange({ ...filters, category: cat });
  const handlePriceChange = (e) =>
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  const handleRating = (r) =>
    onChange({ ...filters, minRating: filters.minRating === r ? 0 : r });
  const handleReset = () =>
    onChange({ category: "All", maxPrice: 50, minRating: 0, sort: "default" });
  const handleSort = (e) => onChange({ ...filters, sort: e.target.value });

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <SlidersHorizontal size={18} />
        <span>Filters</span>
        <button className="filter-sidebar__reset" onClick={handleReset} title="Reset filters">
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Sort */}
      <div className="filter-section">
        <label className="filter-section__label">Sort By</label>
        <select
          className="filter-select"
          value={filters.sort}
          onChange={handleSort}
          id="filter-sort"
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {/* Category */}
      <div className="filter-section">
        <button
          className="filter-section__toggle"
          onClick={() => toggle("category")}
        >
          <span>Category</span>
          {expanded.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.category && (
          <div className="filter-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-category-btn ${filters.category === cat ? "active" : ""}`}
                onClick={() => handleCategory(cat)}
                id={`filter-cat-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="filter-section">
        <button
          className="filter-section__toggle"
          onClick={() => toggle("price")}
        >
          <span>Max Price</span>
          {expanded.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.price && (
          <div className="filter-price">
            <div className="filter-price__label">
              <span>$0</span>
              <span className="filter-price__current">${filters.maxPrice}</span>
              <span>$50</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="filter-price__slider"
              id="filter-price"
            />
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="filter-section">
        <button
          className="filter-section__toggle"
          onClick={() => toggle("rating")}
        >
          <span>Min Rating</span>
          {expanded.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.rating && (
          <div className="filter-ratings">
            {[4, 3, 2, 1].map((r) => (
              <button
                key={r}
                className={`filter-rating-btn ${filters.minRating === r ? "active" : ""}`}
                onClick={() => handleRating(r)}
              >
                {"★".repeat(r)}{"☆".repeat(5 - r)} & up
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
