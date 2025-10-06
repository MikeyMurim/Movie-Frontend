import MovieCard from "../components/MovieCard"
import { useState } from "react"
import "../css/Home.css"
import { searchMovies } from "../Services/api";
import { getPopularMovies } from "../Services/api";
import { useEffect } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch(error) {
                setError(error);
                    console.log(error);
                    setError("Failed to load popular movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    };


    return (<div className="home" >
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for a movie..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button"> Search </button>
        </form>
        <div className="movies-grid">
            {movies.map((movie) =>(
                    <MovieCard movie={movie} key={movie.id} />
                )
            )}
        </div>
    </div>
    );

}

export default Home;