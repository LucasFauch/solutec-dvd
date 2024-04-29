package com.example.api.services.movie;

import com.example.api.models.MovieRent;
import com.example.api.models.movie.Movie;
import com.example.api.models.movie.MovieStock;
import com.example.api.models.movie.MovieWithFavourite;
import com.example.api.repositories.MovieRepository;
import com.example.api.services.MovieRentService;
import com.example.api.services.UserFavouritesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private UserFavouritesService userFavouritesService;
    @Autowired
    private MovieRentService movieRentService;

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(String movieId){
        return movieRepository.findById(movieId);
    }

    public Movie addMovie(Movie movie){
        if(movieRepository.existsByTitle(movie.getTitle())){
            throw new MovieAlreadyExistsException();
        }

        return movieRepository.save(movie);
    }

    public void deleteMovie(String movieId){
        movieRepository.deleteById(movieId);
    }

    public List<MovieWithFavourite> getMoviesWithFavourites(String userId){
        List<Movie> movies = this.getAllMovies();
        List<String> userFavourites = this.userFavouritesService.getUserFavourites(userId);
        List<MovieWithFavourite> moviesWithFavourites =  movies.stream().map((Movie movie)->{
            MovieWithFavourite movieWithFavourite = movie.toMovieWithFavourite();
            movieWithFavourite.setFavourite(userFavourites.contains(movieWithFavourite.getMovieId()));

            return movieWithFavourite;
        }).toList();

        return moviesWithFavourites;
    }

}
