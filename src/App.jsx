import { useState, useEffect } from "react";
import "./App.css";
import BookList from "./components/BookList";

const API_BASE = "http://localhost:3001";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [deletingBookId, setDeletingBookId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      setError("");
      setIsError(false);

      // Set a delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const response = await fetch(`${API_BASE}/books`);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        setBooks(data);
      } catch (err) {
        setIsError(true);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setDeletingBookId(bookId);
    setIsDeleting(true);

    // Set a delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const response = await fetch(`${API_BASE}/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete book: ${response.status}`);
      }

      setBooks(books.filter((b) => b.id !== bookId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingBookId(null);
      setIsDeleting(false);
    }
  };

  const handleFinished = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE}/books/${bookId}`, {
        method: "PATCH",
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

  // const handleDelete = (bookId) => {
  //   setBooks(books.filter((b) => b.id !== bookId));
  // };

  if (isLoading)
    return (
      <div className="app-status">
        <div className="app-status-loading">Loading books</div>
        <div className="app-spinner"></div>
      </div>
    );
  if (isError)
    return (
      <div className="app-status">
        <div className="app-status-error">{error}</div>
      </div>
    );
  return (
    <div className="app">
      <span></span>
      <span></span>
      <span></span>
      <div className="app-section">
        <div className="app-section-head">
          <div className="app-section-title"></div>
          <BookList
            books={books}
            onDelete={handleDelete}
            onFinished={handleFinished}
            deletingBookId={deletingBookId}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
