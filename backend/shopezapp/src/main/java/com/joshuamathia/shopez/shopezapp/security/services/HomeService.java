package com.joshuamathia.shopez.shopezapp.security.services;

import java.util.List;
import java.util.Optional;

import javax.naming.NameNotFoundException;

import com.joshuamathia.shopez.shopezapp.models.Home;
import com.joshuamathia.shopez.shopezapp.repository.HomeRepository;
import com.joshuamathia.shopez.shopezapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {
    @Autowired
    HomeRepository homeRepository;
    @Autowired
    UserRepository userRepository;
   
    // Will need to make a user service so the serivce can be referenced?

    public Optional<Home> findByName(String name) throws NameNotFoundException {
        return homeRepository.findByName(name);
    }
    public Boolean existsByName(String name){
        return homeRepository.existsByName(name);
    }
    public List<Home> findByNameContaining(String name){
        return homeRepository.findByNameContaining(name);
    }

    // public Optional<Home> findbyUsername(String username) {
    //     return homeRepository.findby
    // }
}
