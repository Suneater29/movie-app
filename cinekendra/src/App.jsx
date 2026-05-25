import "./App.css";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const savedMovies = localStorage.getItem("watchlist");

    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const API_KEY = "ae0567e2";

  function addToWatchlist(movie) {
    const alreadyExists = watchlist.find((item) => item.title === movie.title);

    if (alreadyExists) return;

    setWatchlist([...watchlist, movie]);
  }
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  function removeFromWatchlist(title) {
    setWatchlist(watchlist.filter((movie) => movie.title !== title));
  }

  useEffect(() => {
  fetchTrendingMovies();
}, []);

async function fetchTrendingMovies() {
  try {

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=marvel`
    );

    const data = await response.json();

    if (data.Search) {

      const formattedMovies =
      data.Search.map((movie) => ({

        title: movie.Title,

        genre: movie.Year,

        image:
          movie.Poster !== "N/A"
          ? movie.Poster
          : "https://placehold.co/200x300"

      }));

      setMovies(formattedMovies);
    }

  } catch(error){

    console.log(error);

  }
}
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

      <h2 style={{ padding: "20px" }}>Watchlist ({watchlist.length})</h2>

      <div className="movie-container">
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            genre={movie.genre}
            image={movie.image}
            buttonText="❌ Remove"
            onAction={() => removeFromWatchlist(movie.title)}
          />
        ))}
      </div>

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
              buttonText="+ Watchlist"
              onAction={() => addToWatchlist(movie)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
