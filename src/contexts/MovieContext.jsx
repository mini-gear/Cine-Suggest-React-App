import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {


    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem('favorites')
        if (storedFavs) {
            setFavorite(JSON.parse(storedFavs))
        }
    
    }, [])

    useEffect (() => {
        localStorage.setItem('favorites', JSON.stringify(favorite))
    }, [favorite])

    const addToFavorite = (movie) => {
        setFavorite( prev => [...prev, movie])
    }

    const removeFromFavorit = (movieID) => {
        setFavorite(prev => prev.filter(movie => movie.id !== movieID))
    }

    const isFavorite = (movieID) => {
        return favorite.some(movie => movie.id === movieID)
    }

    const value = {
        favorite,
        addToFavorite,
        setFavorite,
        isFavorite,
        removeFromFavorit
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
