package com.example.api.repositories;

import com.example.api.models.UserFavourites;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserFavouritesRepository extends MongoRepository<UserFavourites, String> {
    UserFavourites findByUserId(String userId);
}
