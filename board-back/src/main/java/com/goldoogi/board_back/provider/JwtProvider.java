package com.goldoogi.board_back.provider;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;
    SecretKey key = Jwts.SIG.HS256.key().build();

    public String create(String email) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                        .subject(email)
                        .expiration(expiredDate)
                        .signWith(key)
                        .compact();
        
        return jwt;
    }

    public String validate(String jwt) {
        
        Claims claims = null;
        
        try {
            claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return claims.getSubject();

    }

    // private final int EXP = 1000*60*60;
    // public final String TOKEN_PREFIX = "Bearer ";

    // public String create(String email) {
    //     try {
    //         Algorithm algorithm = Algorithm.HMAC512(secretKey);
    //         String jwt = JWT.create()
    //             .withSubject(email) 
    //             .withIssuer("goldoogi")
    //             .withClaim("user", email)
    //             .withExpiresAt(new Date(System.currentTimeMillis()+EXP))
    //             .sign(algorithm);
    //         return TOKEN_PREFIX+jwt;
    //     } catch (JWTCreationException exception){
    //         // Invalid Signing configuration / Couldn't convert Claims.
    //         return null;
    //     }
    // }

    // public DecodedJWT validate(String jwt) throws SignatureVerificationException, TokenExpiredException {
    //     DecodedJWT decodedJWT;
    //     try {
    //         Algorithm algorithm = Algorithm.HMAC512(secretKey);
    //         JWTVerifier verifier = JWT.require(algorithm)
    //             // specify any specific claim validations
    //             .withIssuer("goldoogi")
    //             // reusable verifier instance
    //             .build();
    //         decodedJWT = verifier.verify(jwt);
    //         return decodedJWT;
    //     } catch (JWTVerificationException exception){
    //         // Invalid signature/claims
    //         return null;
    //     }
    // }

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
