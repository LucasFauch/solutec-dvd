package com.example.api.services;

import com.example.api.models.MovieRent;
import com.example.api.models.movie.Movie;
import com.example.api.models.movie.MovieStock;
import com.example.api.repositories.MovieRentRepository;
import com.example.api.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieRentService {

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MovieRentRepository movieRentRepository;

    public MovieRent rentMovie(String userId, String movieId, String rentType){
        Optional<Movie> movie = this.movieRepository.findById(movieId);
        if(movie.isEmpty()) {
            return null;
        }

        MovieStock stock = movie.get().getStock();
        switch (rentType) {
            case "DVD":
                stock.setDvd(stock.getDvd() - 1);
                break;
            case "Blu-Ray":
                stock.setBluRay(stock.getBluRay() - 1);
                break;
        }
        movie.get().setStock(stock);
        movieRepository.save(movie.get());

        MovieRent movieRent = new MovieRent();
        movieRent.setMovieId(movieId);
        movieRent.setUserId(userId);
        movieRent.setRentType(rentType);

        return movieRentRepository.save(movieRent);
    }

    public List<Optional<Movie>> getRents(String userId){
        List<MovieRent> movieRents = movieRentRepository.getByUserId(userId);
        return movieRents.stream().map(movieRent -> movieRepository.findById(movieRent.getMovieId())).toList();
    }
}
