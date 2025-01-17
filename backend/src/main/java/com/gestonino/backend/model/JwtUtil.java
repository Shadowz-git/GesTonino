package com.gestonino.backend.model;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    public String generateToken(Authentication authentication) {
        String secretKey = "Gestoninoisthebestgestionaleindeuorlperingegneriagestionale";
        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 1 settimana di validità
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
