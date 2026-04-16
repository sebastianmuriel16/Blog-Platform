package blog.services.impl;

import blog.Security.BlogUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.nio.file.attribute.UserPrincipal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JwtService {



    @Value("${jwt.secret}")
    private String secretKey;

    private final Long jwtExpirationMs = 86400000L;

    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();

        BlogUserDetails user = (BlogUserDetails) userDetails;
        claims.put("userId", user.getId().toString());

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey(){
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims validationToken(String token) {
        return
                Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }




}
