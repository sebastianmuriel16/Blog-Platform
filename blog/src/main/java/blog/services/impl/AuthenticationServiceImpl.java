package blog.services.impl;

import blog.Security.BlogUserDetails;
import blog.entities.User;
import blog.entities.dtos.CreateUserDto;
import blog.exceptions.ConflictException;
import blog.mappers.UserMapper;
import blog.repositories.UserRepository;
import blog.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    private Long jwtExpirationInMs = 86400000L;

    @Override
    public UserDetails  authenticate(String email, String password) {
       authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(email, password)
       );

       return userDetailsService.loadUserByUsername(email);
    }

    @Override
    public UserDetails signup(CreateUserDto createUserDto) {
        if(userRepository.findByEmail(createUserDto.getEmail()).isPresent()){
            throw new ConflictException("Email already exists");
        }

        User user = userMapper.toEntity(createUserDto);
        user.setPassword(passwordEncoder.encode(createUserDto.getPassword()));
        User savedUser = userRepository.save(user);

        return new BlogUserDetails(savedUser);
    }

//    @Override
//    public String generateToken(UserDetails userDetails) {
//        Map<String, Object> claims = new HashMap<>();
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
//                .signWith(getSigningKey(), SignatureAlgorithm.ES256)
//                .compact();
//    }
//
//    private Key getSigningKey() {
//        byte[] keyBytes = secretKey.getBytes();
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
}
