import { createContext, useContext, useReducer } from "react";

const SearchContext = createContext(null);

const initialState = {
  items: [],
  loading: false,
  error: "",
  hasSearched: false
};

function searchReducer(state, action) {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        loading: true,
        error: "",
        hasSearched: true
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        items: action.payload
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      };
    default:
      return state;
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  async function searchMovies({ title, year, type }) {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;


    dispatch({ type: "SEARCH_START" });

    try {
      const params = new URLSearchParams({
        apikey: apiKey,
        s: title.trim()
      });

      if (year) {
        params.append("y", year);
      }
      if (type) {
        params.append("type", type);
      }

      const response = await fetch(`https://www.omdbapi.com/?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Falha ao conectar com a API.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        dispatch({
          type: "SEARCH_ERROR",
          payload: data.Error || "Nenhum resultado encontrado."
        });
        return;
      }

      dispatch({
        type: "SEARCH_SUCCESS",
        payload: data.Search || []
      });
    } catch (error) {
      dispatch({
        type: "SEARCH_ERROR",
        payload: error.message || "Erro inesperado ao buscar dados."
      });
    }
  }

  return (
    <SearchContext.Provider
      value={{
        ...state,
        searchMovies
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de SearchProvider.");
  }
  return context;
}
