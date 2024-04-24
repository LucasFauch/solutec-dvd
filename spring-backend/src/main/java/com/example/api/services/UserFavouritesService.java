package com.example.api.services;

import com.example.api.models.UserFavourites;
import com.example.api.repositories.UserFavouritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFavouritesService {

    @Autowired
    private UserFavouritesRepository userFavouritesRepository;

    public void createFavourites(String userId){
        UserFavourites userFavourites = new UserFavourites();
        userFavourites.setUserId(userId);
        userFavourites.setFavourites(List.of());
        userFavouritesRepository.save(userFavourites);
    }

    public List<String> getUserFavourites(String userId){
        return userFavouritesRepository.findByUserId(userId).getFavourites();
    }

    public void addFavourite(String movieId, String userId){
        UserFavourites userFavourites = this.userFavouritesRepository.findByUserId(userId);
        userFavourites.getFavourites().add(movieId);
        userFavouritesRepository.save(userFavourites);
    }

    public void removeFavourite(String movieId, String userId){
        UserFavourites userFavourites = this.userFavouritesRepository.findByUserId(userId);
        userFavourites.getFavourites().remove(movieId);
        userFavouritesRepository.save(userFavourites);
    }

}
