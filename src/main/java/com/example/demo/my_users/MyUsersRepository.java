package com.example.demo.my_users;

import com.example.demo.models.MyUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface MyUsersRepository extends JpaRepository<MyUsers, Long> {

    MyUsers findMyUsersByUserName(String userName);
    MyUsers findMyUsersById(Long id);

    @Query("SELECT u FROM MyUsers u WHERE u.verificationCode = ?1")
    public MyUsers findByVerificationCode(String code);





}
