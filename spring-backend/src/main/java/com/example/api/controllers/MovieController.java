package com.example.api.controllers;

import com.example.api.models.rent.MovieRent;
import com.example.api.models.movie.Movie;
import com.example.api.models.movie.MovieWithFavourite;
import com.example.api.models.rent.RentInfo;
import com.example.api.services.MovieRentService;
import com.example.api.services.movie.MovieAlreadyExistsException;
import com.example.api.services.movie.MovieService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;
    @Autowired
    private MovieRentService movieRentService;

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

    @PostMapping("/rent/{movieId}/{rentType}")
    public MovieRent rentMovie(@PathVariable String movieId, @PathVariable String rentType, HttpServletRequest req){
        final String userId = req.getAttribute("userId").toString();
        return this.movieRentService.rentMovie(userId, movieId, rentType);
    }

    @GetMapping("/rents")
    @Secured("ADMIN")
    public List<RentInfo> getRents(HttpServletRequest req){
        return this.movieRentService.getRents();
    }

    @DeleteMapping("/rents/{rentId}")
    @Secured("ADMIN")
    public void deleteRent(@PathVariable String rentId, HttpServletRequest req){
        this.movieRentService.deleteRent(rentId);
    }

}
