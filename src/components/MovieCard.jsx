import '../css/MovieCard.css'
import { useState } from 'react'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({movie}) {

   const {isFavorite, addToFavorite, removeFromFavorit} = useMovieContext()

   const favorite = isFavorite(movie.id)
    function onFavoriteClick (e) {
        e.preventDefault()
        if (favorite) removeFromFavorit(movie.id)
        else addToFavorite(movie)
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-overlay">
                    <button className={`favorite-btn${favorite ? 'active' : ""}`} onClick={onFavoriteClick}>❤</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <span >
                <p>{movie.release_date?.split('-')[0]}</p>
                <p>Rating: {movie.vote_average}/10</p>
                </span>
            </div>
        </div>
    )
}

export default MovieCard