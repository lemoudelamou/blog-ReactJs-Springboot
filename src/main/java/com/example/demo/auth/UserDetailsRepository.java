package com.example.demo.auth;

import com.example.demo.models.MyUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<MyUsers, Long> {
    Optional<MyUsers> findMyUsersByUserName(String userName);
    Boolean existsByUserName(String userName);





}
