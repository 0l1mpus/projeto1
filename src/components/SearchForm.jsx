import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearch } from "../contexts/SearchContext";

const schema = yup.object({
  title: yup
    .string()
    .required("Informe o titulo para buscar.")
    .min(2, "Digite pelo menos 2 caracteres."),
  year: yup
    .string()
    .optional()
    .matches(/^\d{4}$/, "O ano deve ter 4 digitos.")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  type: yup.string().optional()
});

export default function SearchForm() {
  const { searchMovies, loading } = useSearch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      year: "",
      type: ""
    }
  });

  const onSubmit = (values) => {
    searchMovies(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <div style={styles.field}>
        <label htmlFor="title">Titulo *</label>
        <input id="title" type="text" placeholder="Ex.: Batman" {...register("title")} />
        {errors.title && <small style={styles.error}>{errors.title.message}</small>}
      </div>

      <div style={styles.field}>
        <label htmlFor="year">Ano</label>
        <input id="year" type="text" maxLength={4} placeholder="Ex.: 2020" {...register("year")} />
        {errors.year && <small style={styles.error}>{errors.year.message}</small>}
      </div>

      <div style={styles.field}>
        <label htmlFor="type">Tipo</label>
        <select id="type" {...register("type")}>
          <option value="">Todos</option>
          <option value="movie">Filme</option>
          <option value="series">Serie</option>
          <option value="episode">Episodio</option>
        </select>
      </div>

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "grid",
    gap: "12px",
    marginBottom: "20px"
  },
  field: {
    display: "grid",
    gap: "6px"
  },
  button: {
    width: "140px",
    height: "40px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#0d6efd"
  },
  error: {
    color: "#b02a37"
  }
};
