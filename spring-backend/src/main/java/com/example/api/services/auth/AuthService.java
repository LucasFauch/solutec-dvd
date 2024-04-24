package com.example.api.services.auth;

import com.example.api.models.user.User;
import com.example.api.models.user.UserCredentialsRequest;
import com.example.api.repositories.UserRepository;
import com.example.api.services.UserFavouritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserFavouritesService userFavouritesService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User addUser(UserCredentialsRequest userCredentialsRequest) throws UsernameAlreadyExistsException{

        if(this.userRepository.existsByUsername(userCredentialsRequest.getUsername())){
            throw new UsernameAlreadyExistsException();
        }

        String encryptedPassword = passwordEncoder.encode(userCredentialsRequest.getPassword());
        User user = userRepository.insert(userCredentialsRequest.toUser(encryptedPassword));

        userFavouritesService.createFavourites(user.getUserId());

        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("This user does not exist"));
    }

    public UserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("This user does not exist"));
    }
}
