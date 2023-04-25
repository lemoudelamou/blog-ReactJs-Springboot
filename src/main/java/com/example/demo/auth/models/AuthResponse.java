package com.example.demo.auth.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter
@AllArgsConstructor
public class AuthResponse implements Serializable {
    private String jwt;
}
