package com.example.demo.auth.services;


import com.example.demo.auth.UserDetailsRepository;
import com.example.demo.auth.models.UserDetailsImpl;
import com.example.demo.models.MyUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDetailsRepository UserDetailsRepository;

    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<MyUsers> user = UserDetailsRepository.findMyUsersByUserName(userName);

        user.orElseThrow(() -> new UsernameNotFoundException(userName + " not found."));

        return user.map(UserDetailsImpl::new).get();
    }




}
