package com.example.api.repositories;

import com.example.api.models.movie.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie, String> {

    boolean existsByTitle(String title);

}
