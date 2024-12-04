import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
useState;
import '../css/Home.css'
import { searchMovies, getPopularMovies } from "../services/api"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load Movies!!")
            }
            finally { setLoading(false) }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async(e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError('Failed to Search movies')
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movie..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">
                    Search
                </button>
            </form>
            {loading ? (<div className="loading">Loading...</div>)
                :
                <div className="movies-grid">
                    {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
                </div>}
        </div>
    );
}

export default Home;
