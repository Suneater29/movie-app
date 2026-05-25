import "./App.css";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = "ae0567e2";

  async function handleSearch() {
    if (search === "") return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`,
      );

      const data = await response.json();

      if (data.Search) {
        const formattedMovies = data.Search.map((movie) => ({
          title: movie.Title,
          genre: movie.Year,
          image:
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/200x300",
        }));

        setMovies(formattedMovies);
      }
    } catch (error) {
      console.log(error);
    }

    setSearch("");
  }

  return (
    <>
      <Navbar />

      <section className="hero">
        <h2>Find Movies With AI 🎬</h2>

        <p>Describe your mood and discover movies instantly</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Batman..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      <section>
        <h2>Recommended Movies</h2>

        <div className="movie-container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.title}
              title={movie.title}
              genre={movie.genre}
              image={movie.image}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
