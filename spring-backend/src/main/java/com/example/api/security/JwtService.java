package com.example.api.security;

import com.example.api.models.user.User;
import com.example.api.services.auth.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final String SECRET = "6666602c32799437ae9810c38d6cb1541f61c6e31d97746b218b7c971e7b12a0";

    @Autowired
    AuthService authService;

    public Map<String, String> generate(String username){
        User user = (User) this.authService.loadUserByUsername(username);
        return this.generateJwt(user);
    }

    private Map<String, String> generateJwt(User user){
        Map<String, String> claims =  Map.of("username", user.getUsername(),
                Claims.ID, user.getUserId());

        String jwt = Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .subject(user.getUserId())
                .claims(claims)
                .signWith(getKey())
                .compact();

        return Map.of("token", jwt, "userId", user.getUserId());
    }

    private SecretKey getKey(){
        final byte[] decoder = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(decoder);
    }

    public String extractUserId(String token){
        return this.getClaim(token, Claims::getId);
    }

    private <T> T getClaim(String token, Function<Claims, T> claimsResolver){
        Claims claims = Jwts.parser().verifyWith(this.getKey()).build().parseSignedClaims(token).getPayload();
        return claimsResolver.apply(claims);
    }

}
