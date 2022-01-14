import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMovieHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("https://swapi.dev/api/films/");
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date,
                };
            });
            setMovies(transformedMovies);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
                {!isLoading && movies.length === 0 && <p>No movies</p>}
                {!isLoading && error && <h1>{error}</h1>}
                {isLoading && <h1>Loading...</h1>}
            </section>
        </React.Fragment>
    );
}
export default App;
