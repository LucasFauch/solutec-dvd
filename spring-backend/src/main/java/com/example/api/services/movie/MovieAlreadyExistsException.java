package com.example.api.services.movie;

public class MovieAlreadyExistsException extends RuntimeException {

    public MovieAlreadyExistsException() {
        super("This movie already exists");
    }

}
