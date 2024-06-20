package com.goldoogi.board_back.provider;


import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

@Component
public class JwtProvider {
    @Value("${secret-key}")
    private String secretKey;

    private final int EXP = 1000*60*60;
    public final String TOKEN_PREFIX = "Bearer ";
    public final String HEADER = "Authorization";

    public String create(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC512(secretKey);
            String jwt = JWT.create()
                .withSubject(email) 
                .withIssuer("goldoogi")
                .withClaim("user", email)
                .withExpiresAt(new Date(System.currentTimeMillis()+EXP))
                .sign(algorithm);
            return TOKEN_PREFIX+jwt;
        } catch (JWTCreationException exception){
            // Invalid Signing configuration / Couldn't convert Claims.
            return null;
        }
    }

    public DecodedJWT validate(String jwt) throws SignatureVerificationException, TokenExpiredException {
        DecodedJWT decodedJWT;
        try {
            Algorithm algorithm = Algorithm.HMAC512(secretKey);
            JWTVerifier verifier = JWT.require(algorithm)
                // specify any specific claim validations
                .withIssuer("goldoogi")
                // reusable verifier instance
                .build();
            decodedJWT = verifier.verify(jwt);
            return decodedJWT;
        } catch (JWTVerificationException exception){
            // Invalid signature/claims
            return null;
        }
    }

    // public static String create(String email) {
    //     Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
    //     String jwt = JWT.create()
    //             .withSubject(email)
    //             .withExpiresAt(new Date(System.currentTimeMillis()+EXP))
    //             .withClaim("user", email)
    //             .sign(Algorithm.HMAC512(SECRET));
    //     return TOKEN_PREFIX+jwt;
    // }

    // public static DecodedJWT verify(String jwt) throws SignatureVerificationException, TokenExpiredException{
    //     DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512("goldoogi"))
    //                 .build().verify(jwt);
    //     return decodedJWT;
    // }
}
