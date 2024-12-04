import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorites() {

    const { favorite } = useMovieContext();

    if (favorite) {
        return (
        <div>
            <h2 className='favorites'>Your Favorites</h2>
        <div className="movies-grid">
            {favorite.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
        </div>
        </div>
        
    )
    }


return <div className="favorites-empty">

    <h2>No favorites movies yet</h2>
    <p>Start adding favorites and they will appear here!</p>

</div>
    
}

export default Favorites