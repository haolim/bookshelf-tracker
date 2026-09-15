import styles from "./BookList.module.css";
import BookCard from "./BookCard";

export default function BookList({
  books,
  onDelete,
  onFinished,
  deletingBookId,
  isDeleting,
}) {
  return (
    <>
      {books.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyTitle}>
            <div className={styles.emptyText}></div>
            No books yet. Add one below!
          </div>
        </div>
      ) : (
        <ul className={styles.list}>
          {books.map((b) => (
            <li key={b.id}>
              <BookCard
                book={b}
                onDelete={onDelete}
                onFinished={onFinished}
                deletingBookId={deletingBookId}
                isDeleting={isDeleting}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
