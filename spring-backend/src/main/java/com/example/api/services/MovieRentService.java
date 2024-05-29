package com.example.api.services;

import com.example.api.models.rent.MovieRent;
import com.example.api.models.movie.Movie;
import com.example.api.models.movie.MovieStock;
import com.example.api.models.rent.RentInfo;
import com.example.api.repositories.MovieRentRepository;
import com.example.api.repositories.MovieRepository;
import com.example.api.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieRentService {

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MovieRentRepository movieRentRepository;
    @Autowired
    private AuthService authService;

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

    public List<RentInfo> getRents(){
        List<MovieRent> movieRents = movieRentRepository.findAll();
        List<RentInfo> infos = new ArrayList<>();
        for(MovieRent movieRent : movieRents){
            final String username = this.authService.loadUserByUserId(movieRent.getUserId()).getUsername();
            final String movieName = this.movieRepository.findById(movieRent.getMovieId()).get().getTitle();
            final String rentType = movieRent.getRentType();
            final String rentId = movieRent.getId();

            RentInfo rentInfo = new RentInfo();
            rentInfo.setUsername(username);
            rentInfo.setMovieName(movieName);
            rentInfo.setRentType(rentType);
            rentInfo.setRentId(rentId);

            infos.add(rentInfo);
        }

        return infos;
    }

    public void deleteRent(String rentId){
        MovieRent movieRent = movieRentRepository.findById(rentId).get();
        final String rentType = movieRent.getRentType();
        final String movieId = movieRent.getMovieId();
        Movie movie = this.movieRepository.findById(movieId).get();
        if(rentType.equals("DVD")){
            MovieStock stock = movie.getStock();
            stock.setDvd(stock.getDvd() + 1);
            movie.setStock(stock);
            movieRepository.save(movie);
        }
        if(rentType.equals("Blu-Ray")){
            MovieStock stock = movie.getStock();
            stock.setBluRay(stock.getBluRay() + 1);
            movie.setStock(stock);
            movieRepository.save(movie);
        }
        this.movieRentRepository.deleteById(rentId);
    }
}
