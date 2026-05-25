// const input = document.getElementById("movie-input");

// const searchBtn = document.getElementById("search-btn");


// searchBtn.addEventListener("click", ()=>{

//     let userText = input.value;

//     if(userText==="")
//     {
//         alert("Please enter something");
//         return;
//     }

//     alert("You searched: " + userText);

// });
const input = document.getElementById("movie-input");
const searchBtn = document.getElementById("search-btn");
const movieContainer = document.querySelector(".movie-container");

const API_KEY = "PASTE_YOUR_KEY_HERE";


searchBtn.addEventListener("click", ()=>{

    let movieName = input.value;

    if(movieName==="")
    {
        alert("Enter movie name");
        return;
    }

    fetchMovies(movieName);

});


async function fetchMovies(movie){

    let response=await fetch(
`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`
);

    let data=await response.json();

    showMovies(data.results);

}


function showMovies(movies){

    movieContainer.innerHTML="";

    movies.forEach(movie=>{

        movieContainer.innerHTML+=`

        <div class="movie-card">

        <img src=
        "https://image.tmdb.org/t/p/w500${movie.poster_path}">

        <h3>${movie.title}</h3>

        <p>⭐ ${movie.vote_average}</p>

        </div>

        `;

    });

}