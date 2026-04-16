package blog.controllers;

import blog.entities.dtos.AuthResponse;
import blog.entities.dtos.CreateUserDto;
import blog.entities.dtos.LoginRequest;
import blog.entities.dtos.UserResponseDto;
import blog.services.AuthenticationService;
import blog.services.UserService;
import blog.services.impl.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){

        UserDetails userDetails = authenticationService.authenticate(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        String tokenValue = jwtService.generateToken(userDetails);
        AuthResponse authResponse = new AuthResponse(
                tokenValue,
                86400
        );
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody CreateUserDto createUserDto){
        UserDetails userDetails = authenticationService.signup(createUserDto);
        String tokenValue = jwtService.generateToken(userDetails);
        AuthResponse authResponse  = new AuthResponse(
                tokenValue,
                86400
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }
}
