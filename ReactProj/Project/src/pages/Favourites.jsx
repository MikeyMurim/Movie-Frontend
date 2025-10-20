import "../css/Favourites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"


function Favourite() {
    const {favourites} = useMovieContext();
    if (favourites) {
        return (
        <div>
        <h2 className="favourite-title"> Your Favourites </h2>
        <div className="movies-grid">
            {favourites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        </div>
        )
    }
    return <div className = "favourite-empty">
        <h2> No Favourites Added </h2>
        <p> Browse movies and add your favourites to this list. </p>
    </div>
}

export default Favourite;