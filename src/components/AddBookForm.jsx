import { useState } from "react";
import styles from "./AddBookForm.module.css";

const emptyForm = { title: "", author: "", status: "to-read" };

export default function AddBookForm({ onAdd, isAdding }) {
  const [form, setForm] = useState(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onAdd({
      title: form.title,
      author: form.author,
      status: form.status,
    });

    if (ok) setForm(emptyForm);
    setShowAddForm(false);
  };

  return (
    <>
      {!showAddForm && (
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          + Add a book
        </button>
      )}
      {showAddForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              className={styles.input}
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="author">
              Author
            </label>
            <input
              className={styles.input}
              id="author"
              name="author"
              type="text"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="status">
              Status
            </label>
            <select
              className={styles.input}
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="finished">Finished</option>
            </select>
          </div>
          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isAdding}
            >
              {!isAdding ? "Submit" : "Submitting..."}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              disabled={isAdding}
              onClick={() => {
                setShowAddForm(false);
                setForm(emptyForm);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
