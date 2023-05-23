package com.example.demo.auth.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.example.demo.models.MyUsers;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Value("${mou.app.jwt.secret}")
    private String jwtSecret;

    public static final String ROLES = "ROLES";
    //Create JWT Token from MyUser Instance/ Data from DB
    public String generateJWT(Optional<MyUsers> user){
        //HashMap is a default requirement for making the claims in JSON type
        Map<String, Object> claims = new HashMap<>();
        claims.put(ROLES, user.get().getRoles());//Adding roles to claims map
        String secret = jwtSecret;
        Key key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.get().getUserName())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key).compact();
    }
    //Parse and get all claims, if parse is successful token is also ok and verified
    private Claims extractAllClaims(String jwtToken){

        // Set up the signing key
        String secret = jwtSecret;
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        Key key = Keys.hmacShaKeyFor(keyBytes);

// Get a JwtParser instance using the parserBuilder() method
        JwtParser parser = Jwts.parserBuilder()
                .setSigningKey(key)
                .build();
        Claims claims = parser.parseClaimsJws(jwtToken).getBody();
        return claims;
    }
    //Get a single claim from all claims
    private <T> T extractOneClaim(String jwtToken, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }
    //Get username from token
    public String extractUserName(String jwtToken){
        return extractOneClaim(jwtToken, Claims::getSubject);

    }
    //Get single role from token
    public String extractRoles(String jwtToken){
        return extractOneClaim(jwtToken, claims -> (String) claims.get(ROLES));

    }
    //For a list of role
//    public List<String> extractRoles(String token) {
//        return extractOneClaim(token, claims -> (List) claims.get(ROLES));
//    }

    //Get the expiration time
    public Date extractExpiration(String jwtToken){
        return extractOneClaim(jwtToken, Claims::getExpiration);

    }
    //Check if expired or not
    public boolean isJwtExpired(String jwtToken){
        final Date expiration = extractExpiration(jwtToken);
        return expiration.before(new Date());
    }
}

