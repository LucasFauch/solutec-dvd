package com.example.api.models.movie;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("movies")
public class Movie {
    @Id
    private String movieId;
    @Indexed(unique = true)
    private String title;
    private int year;
    private String director;
    private String description;
    private MovieStock stock;
    private String poster = "";

    public MovieWithFavourite toMovieWithFavourite(){
        MovieWithFavourite movie = new MovieWithFavourite();
        movie.setMovieId(movieId);
        movie.setTitle(title);
        movie.setYear(year);
        movie.setDirector(director);
        movie.setDescription(description);
        movie.setStock(stock);
        movie.setPoster(poster);
        return movie;
    }
}
