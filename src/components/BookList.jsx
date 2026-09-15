import styles from "./BookList.module.css";
import BookCard from "./BookCard";

export default function BookList({
  books,
  onDelete,
  onFinished,
  deletingBookId,
}) {
  return (
    <>
      {books.length === 0 ? (
        <div className={styles.empty}>No books yet. Add one!</div>
      ) : (
        <ul className={styles.list}>
          {books.map((b) => (
            <li key={b.id}>
              <BookCard
                book={b}
                onDelete={onDelete}
                onFinished={onFinished}
                deletingBookId={deletingBookId}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
