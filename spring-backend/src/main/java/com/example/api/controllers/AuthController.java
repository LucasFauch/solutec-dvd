package com.example.api.controllers;

import com.example.api.models.user.User;
import com.example.api.models.user.UserCredentialsRequest;
import com.example.api.security.JwtService;
import com.example.api.services.auth.AuthService;
import com.example.api.services.auth.UsernameAlreadyExistsException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController()
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserCredentialsRequest userCredentialsRequest){
        try {
            User user = this.authService.addUser(userCredentialsRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }catch (UsernameAlreadyExistsException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public Map<String, String> login(@Valid @RequestBody UserCredentialsRequest userCredentialsRequest){
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userCredentialsRequest.getUsername(),
                        userCredentialsRequest.getPassword()));
        if(authentication.isAuthenticated()){
            return this.jwtService.generate(authentication.getName());
        }
        return null;
    }

}
