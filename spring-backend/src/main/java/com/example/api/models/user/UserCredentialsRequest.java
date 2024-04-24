package com.example.api.models.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class UserCredentialsRequest {

    @Indexed(unique = true)
    @NotBlank(message = "Username is required")
    private String username;
    @NotBlank(message = "Password is required")
    private String password;

    public User toUser(String encryptedPassword){
        User user = new User();
        user.setUsername(this.getUsername());
        user.setPassword(encryptedPassword);
        user.setAdmin(false);
        return user;
    }

}
