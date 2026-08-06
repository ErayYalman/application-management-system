package com.cybersoft.application_management.security.jwt;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cybersoft.application_management.security.userdetails.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);

        // Header yoksa veya Bearer ile başlamıyorsa diğer filtrelere geç
        if (authorizationHeader == null || !authorizationHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authorizationHeader.substring(BEARER_PREFIX.length());

        try {
            // 1. KRİTİK KONTROL: Bu token gerçekten bir ACCESS token mı?
            JwtTokenType tokenType = jwtService.extractTokenType(token);
            
            if (tokenType == JwtTokenType.ACCESS) {
                
                final String username = jwtService.extractUsername(token);

                // Kullanıcı adı varsa ve o anki istekte (Thread) henüz oturum açılmamışsa
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                    if (jwtService.isTokenValid(token, userDetails)) {

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null, // Şifre null çünkü token zaten kimliği kanıtlıyor
                                        userDetails.getAuthorities()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        // Kullanıcıyı sisteme "Giriş Yapmış" (Authenticated) olarak işaretle
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } else {
                log.warn("Attempt to use REFRESH token as ACCESS token. Path: {}", request.getRequestURI());
            }

        } catch (Exception ex) {
            // Exception fırlarsa filtre patlamasın. Sadece logla. 
            // SecurityContext boş kalacağı için EntryPoint devreye girip 401 dönecek.
            log.warn("JWT authentication failed: {}", ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}