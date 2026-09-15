import styles from "./BookCard.module.css";

const statusStyle = {
  "to-read": styles.toRead,
  reading: styles.reading,
  finished: styles.finished,
};

export default function BookCard({
  book,
  onDelete,
  onFinished,
  deletingBookId,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title} </h3>
        <div className={styles.author}>Author: {book.author}</div>
        <div className={`${styles.badge} ${statusStyle[book.status]}`}>
          Status: {book.status}
        </div>
      </div>

      {book.status !== "finished" && (
        <button
          type="button"
          className={styles.finishButton}
          onClick={() => onFinished(book.id)}
        >
          Mark as finished
        </button>
      )}

      <button
        id={book.id}
        type="button"
        className={styles.deleteButton}
        onClick={() => onDelete(book.id)}
        disabled={deletingBookId}
      >
        {deletingBookId !== book.id ? "Delete" : "Deleting..."}
      </button>
    </div>
  );
}
