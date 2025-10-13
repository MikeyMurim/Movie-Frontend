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
            } catch (error) {
                setError(error);
                console.log(error);
                setError("Failed to load popular movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);

    const handleSearch = async(e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch(err) {
            console.log(err);
            setError("Failed to search movies. Please try again later.");
        } finally {
            setLoading(false);
        }
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

        {error && <div className="error"> {error} </div>}

        {loading ? <div className="loading"> Loading... </div> : <div className="movies-grid">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            )
            )}
        </div>}




    </div>
    );

}

export default Home;