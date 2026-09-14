import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "http://localhost:3001";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

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
          {books.map((book) => (
            <span key={book.id}> {book.title} </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
