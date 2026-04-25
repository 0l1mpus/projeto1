export default function MovieCard({ movie }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=Sem+Imagem";

  return (
    <article style={styles.card}>
      <img src={poster} alt={`Poster de ${movie.Title}`} style={styles.poster} />
      <div style={styles.content}>
        <h3 style={styles.title}>{movie.Title}</h3>
        <p style={styles.meta}>
          {movie.Year} - {movie.Type}
        </p>
      </div>
    </article>
  );
}

const styles = {
  card: {
    border: "1px solid #dde3ea",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  poster: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    display: "block"
  },
  content: {
    padding: "10px"
  },
  title: {
    fontSize: "16px",
    margin: "0 0 6px 0"
  },
  meta: {
    margin: 0,
    color: "#425466"
  }
};
