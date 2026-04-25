import SearchForm from "./SearchForm";
import StatusMessage from "./StatusMessage";
import MovieList from "./MovieList";
import { useSearch } from "../contexts/SearchContext";

export default function App() {
  const { loading, error, hasSearched, items } = useSearch();

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>Busca de Filmes</h1>
        

        <SearchForm />
        <StatusMessage loading={loading} error={error} hasSearched={hasSearched} />
        <MovieList items={items} />
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "32px 16px"
  },
  container: {
    width: "100%",
    maxWidth: "920px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    padding: "24px"
  },
  title: {
    marginTop: 0,
    marginBottom: "6px"
  },
  subtitle: {
    marginTop: 0,
    color: "#4d5965"
  }
};
