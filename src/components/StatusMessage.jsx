export default function StatusMessage({ loading, error, hasSearched }) {
  if (loading) {
    return <p style={styles.info}>Carregando resultados...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  if (!hasSearched) {
    return <p style={styles.info}>Preencha os campos e clique em Buscar.</p>;
  }

  return null;
}

const styles = {
  info: {
    color: "#425466"
  },
  error: {
    color: "#b02a37",
    fontWeight: 600
  }
};
