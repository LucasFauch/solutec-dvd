package com.example.api.controllers;

import com.example.api.models.movie.Movie;
import com.example.api.models.movie.MovieWithFavourite;
import com.example.api.services.movie.MovieAlreadyExistsException;
import com.example.api.services.movie.MovieService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping()
    public List<MovieWithFavourite> getMoviesWithFavourites(HttpServletRequest req){
        final String userId = req.getAttribute("userId").toString();
        return this.movieService.getMoviesWithFavourites(userId);
    }

    @PostMapping()
    public ResponseEntity<?> addMovie(@RequestBody Movie requestMovie){
        try {
            Movie movie = this.movieService.addMovie(requestMovie);
            return ResponseEntity.status(HttpStatus.CREATED).body(movie);
        }catch (MovieAlreadyExistsException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> deleteMovie(@PathVariable String movieId){
        this.movieService.deleteMovie(movieId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/{movieId}")
    public Optional<Movie> getMovieById(@PathVariable String movieId){
        return this.movieService.getMovieById(movieId);
    }

}
