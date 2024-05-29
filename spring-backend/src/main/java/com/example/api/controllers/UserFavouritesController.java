package com.example.api.controllers;

import com.example.api.services.UserFavouritesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies/favourites")
public class UserFavouritesController {

    @Autowired
    private UserFavouritesService userFavouritesService;

    @PostMapping("/{movieId}")
    void addFavourite(@PathVariable String movieId, HttpServletRequest req) {
        final String userId = req.getAttribute("userId").toString();
        this.userFavouritesService.addFavourite(movieId, userId);
    }

    @DeleteMapping("/{movieId}")
    void removeFavourite(@PathVariable String movieId, HttpServletRequest req) {
        final String userId = req.getAttribute("userId").toString();
        this.userFavouritesService.removeFavourite(movieId, userId);
    }

    @GetMapping()
    List<String> getUserFavourites(HttpServletRequest req) {
        final String userId = req.getAttribute("userId").toString();
        return this.userFavouritesService.getUserFavourites(userId);
    }
}
