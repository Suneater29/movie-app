function MovieCard(props) {
  return (
    <div className="movie-card">

      <img
        src={props.image}
        alt="movie"
      />

      <h3>{props.title}</h3>

      <p>{props.genre}</p>

    </div>
  )
}

export default MovieCard