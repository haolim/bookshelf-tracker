import { useState, useEffect } from "react";
import "./App.css";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";

const API_BASE = "http://localhost:3001";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingBookId, setDeletingBookId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Set a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(`${API_BASE}/books`);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = books.filter(
    (b) => statusFilter === "all" || b.status === statusFilter,
  );

  const handleAddBook = async (newBook) => {
    setIsAdding(true);

    try {
      // Set a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(`${API_BASE}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error(`Failed to add book: ${response.status}`);
      }

      const created = await response.json();

      setBooks((prev) => [...prev, created]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setDeletingBookId(bookId);
    try {
      // Set a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(`${API_BASE}/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete book: ${response.status}`);
      }

      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingBookId(null);
    }
  };

  const handleFinished = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE}/books/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "finished" }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update book: ${response.status}`);
      }

      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, status: "finished" } : b)),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading)
    return (
      <div className="app">
        <div className="app-section">
          <div className="app-loading">Loading books...</div>
        </div>
      </div>
    );

  const readingStatus = [
    { value: "all", label: "All" },
    { value: "to-read", label: "To Read" },
    { value: "reading", label: "Reading" },
    { value: "finished", label: "Finished" },
  ];

  return (
    <div className="app">
      <h1 className="app-title">Bookshelf Tracker</h1>
      {error && <div className="app-error">{error}</div>}

      <div className="app-section">
        <AddBookForm onAdd={handleAddBook} isAdding={isAdding} />
      </div>
      <div className="app-section">
        <div className="app-section-head">
          <h2 className="app-section-title">Your books</h2>
        </div>
      </div>
      <div className={"app-filter"}>
        {readingStatus.map((s) => (
          <button
            className={`app-filter-button ${
              statusFilter === s.value ? "is-active" : ""
            }`}
            key={s.value}
            onClick={() => setStatusFilter(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <BookList
        books={filteredBooks}
        onDelete={handleDelete}
        onFinished={handleFinished}
        deletingBookId={deletingBookId}
      />
    </div>
  );
}

export default App;
