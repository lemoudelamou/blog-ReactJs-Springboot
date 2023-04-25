package com.example.demo.auth;

import com.example.demo.auth.models.AuthRequest;
import com.example.demo.auth.models.AuthResponse;
import com.example.demo.auth.utils.JwtUtil;
import com.example.demo.models.MyUsers;
import com.example.demo.my_users.MyUsersRepository;
import com.example.demo.my_users.MyUsersService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;


@RestController
public class AuthController {
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private MyUsersRepository myUsersRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private MyUsersService myUsersService;



    @GetMapping("/usernamecheck/{userName}")
    public boolean authUsernameCheck(@PathVariable String userName) {
        return (userDetailsRepository.existsByUserName(userName));
    }



    @GetMapping("/verifyjwt")
    public MyUsers verifyJWT(Principal principal) {
        return myUsersRepository.findMyUsersByUserName(principal.getName());
    }

    @PostMapping("/register")
    public void authRegister(@RequestBody MyUsers regUser, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        regUser.setPassword(passwordEncoder.encode(regUser.getPassword()));
        String randomCode = RandomString.make(8);
        regUser.setActive(false);
        regUser.setVerificationCode(randomCode);
        userDetailsRepository.save(regUser);
        myUsersService.sendVerificationEmail(regUser, myUsersService.getSiteURL(request));

    }


    @GetMapping("/verify")
    public Boolean verifyUser(@Param("code") String code, HttpServletResponse res) throws ServletException, IOException {
        MyUsers user = myUsersRepository.findByVerificationCode(code);

        if (user == null ) {
            res.sendRedirect("http://localhost:3000/verifyFailed");

            return false;
        } else if (user.isActive() && user.getVerificationCode() == null) {
            res.sendRedirect("http://localhost:3000/activated");

            return false;

        } else {
            user.setVerificationCode(null);
            user.setActive(true);
            myUsersRepository.save(user);

            res.sendRedirect("http://localhost:3000/verifySuccess");

            return true;
        }
    }




    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAndGetJWT(@RequestBody AuthRequest authRequest) throws Exception {
            try {

                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
            } catch (BadCredentialsException e) {
                throw new Exception("Incorrect username or password", e);
            }

        String jwt = jwtUtil.generateJWT(userDetailsRepository.findMyUsersByUserName(authRequest.getUserName()));
        return ResponseEntity.ok(new AuthResponse(jwt));

    }
}
