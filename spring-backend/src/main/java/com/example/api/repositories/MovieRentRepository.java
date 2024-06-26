package com.example.api.repositories;

import com.example.api.models.rent.MovieRent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRentRepository extends MongoRepository<MovieRent, String> {
    List<MovieRent> getByUserId(String userId);
    List<MovieRent> getAllByUserId(String userId);
}
