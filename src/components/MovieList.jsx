import MovieCard from "./MovieCard";

export default function MovieList({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Resultados</h2>
      <div style={styles.grid}>
        {items.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px"
  }
};
