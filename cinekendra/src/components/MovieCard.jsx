function MovieCard(props) {
  return (
    <div className="movie-card">

      <img
        src={props.image}
        alt={props.title}
      />

      <h3>{props.title}</h3>

      <p>📅 {props.genre}</p>

      <button
        className="watch-btn"
        onClick={props.onAction}
      >
        {props.buttonText}
      </button>

    </div>
  );
}

export default MovieCard;