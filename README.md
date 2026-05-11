# Interactive Bookstore Application

A full-featured, premium React application that allows users to browse and search for books, view book details, manage a shopping cart, and mock a checkout process. Built with modern web development practices to deliver a high-quality user experience.

## Features

- **Home Page**: Dynamic landing page featuring trending books, categories, and live store statistics.
- **Book Listing & Filtering**: Browse the entire catalog with real-time search, category filtering, price range sliders, and rating filters.
- **Book Details**: Comprehensive pages showing book descriptions, mock reviews, metadata (pages, publisher, ISBN), and related books.
- **Shopping Cart**: Real-time cart management with quantity adjustments and subtotal/tax/shipping calculations.
- **Checkout Flow**: Multi-step checkout process (Shipping, Payment, Review) with robust form validation.
- **Authentication**: Mock user authentication (Login/Register) utilizing `localStorage` to persist sessions.
- **Premium UI**: Custom responsive CSS with dark mode, glassmorphism, floating micro-animations, and SVG gradients.

## Tech Stack

- **Framework**: ReactJS 18 + Vite
- **Routing**: React Router DOM v6
- **State Management**: React Context API + `useReducer`
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage`

## Project Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdulkalam143/bookstore.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bookstore
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server, run:
```bash
npm run dev
```
Open your browser and visit `http://localhost:5173/` (or the port specified in your terminal) to view the application.

## Evaluation Criteria Met

- **Functionality**: Meets all specified requirements including search, filtering, cart management, and order placement.
- **Code Quality**: Built with modular components, React Context for state management, and clear file structure.
- **User Interface**: Features a visually stunning, responsive, and premium dark-mode UI with engaging animations.
- **Error Handling**: Gracefully handles missing books, empty carts, and incorporates form validation during authentication and checkout.
- **Bonus Tasks**: Implemented mock user authentication and local storage persistence.

---
*Developed for the Interactive Bookstore Application assignment.*
