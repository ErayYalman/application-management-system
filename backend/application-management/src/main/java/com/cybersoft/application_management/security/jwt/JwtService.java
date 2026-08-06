package com.cybersoft.application_management.security.jwt;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.cybersoft.application_management.exception.jwt.InvalidJwtException;
import com.cybersoft.application_management.exception.jwt.TokenExpiredException;
import com.cybersoft.application_management.exception.refresh.InvalidRefreshTokenException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtProperties jwtProperties;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                jwtProperties.getSecret()
                        .getBytes(StandardCharsets.UTF_8));
    }

    private Claims extractAllClaims(String token) {
        try {

            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

        } catch (ExpiredJwtException ex) {

            log.warn("JWT token expired.");

            throw new TokenExpiredException(ex);

        } catch (JwtException | IllegalArgumentException ex) {

            log.warn("Invalid JWT token. Reason: {}", ex.getMessage());

            throw new InvalidJwtException(ex);

        }
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);

    }

    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject);

    }

    public Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration);

    }

    public JwtTokenType extractTokenType(String token) {

        return JwtTokenType.valueOf(

                extractClaim(
                        token,
                        claims -> claims.get(JwtClaim.TYPE, String.class))

        );

    }

    public boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());

    }

    private GeneratedToken buildToken(
            Map<String, Object> claims,
            UserDetails userDetails,
            long expiration) {

        Instant now = Instant.now();

        Instant expirexAt = now.plusMillis(expiration);

        String token = Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuer(jwtProperties.getIssuer())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expirexAt))
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();

        return new GeneratedToken(token, expirexAt);

    }

    public GeneratedToken generateAccessToken(
            UserDetails userDetails) {

        Map<String, Object> claims = Map.of(
                JwtClaim.ROLE,
                userDetails.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority(),
                JwtClaim.TYPE,
                JwtTokenType.ACCESS.name());
        return buildToken(
                claims,
                userDetails,
                jwtProperties.getAccessExpiration());

    }

    public GeneratedToken generateRefreshToken(
            UserDetails userDetails) {

        Map<String, Object> claims = Map.of(
                JwtClaim.TYPE,
                JwtTokenType.REFRESH.name());
        return buildToken(
                claims,
                userDetails,
                jwtProperties.getRefreshExpiration());

    }

    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        String username = extractUsername(token);

        return username.equals(userDetails.getUsername())

                &&

                !isTokenExpired(token);

    }

    public void validateRefreshToken(String token) {
        Claims claims = extractAllClaims(token);
        String type = claims.get(JwtClaim.TYPE, String.class);
        if (!JwtTokenType.REFRESH.name().equals(type)) {
            throw new InvalidRefreshTokenException();
        }
    }

}
