package blog.config;

import blog.Security.BlogUserDetails;
import blog.Security.BlogUserDetailsService;
import blog.Security.JwtFilter;
import blog.services.AuthenticationService;
import blog.services.impl.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;


    @Bean
    public JwtFilter jwtFilter(JwtService jwtService, BlogUserDetailsService blogUserDetailsService) {
        return new JwtFilter(jwtService, blogUserDetailsService);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/v1/auth/signup").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/posts/drafts").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/tags/**").permitAll()
                                .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}
