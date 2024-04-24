package com.example.api.services.auth;

public class MissingCredentialsException extends RuntimeException{

    public MissingCredentialsException(){
        super("Missing username or password");
    }

}
