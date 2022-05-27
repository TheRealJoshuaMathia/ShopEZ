package com.joshuamathia.shopez.shopezapp.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import com.joshuamathia.shopez.shopezapp.models.Home;
import com.joshuamathia.shopez.shopezapp.models.User;
import com.joshuamathia.shopez.shopezapp.payload.request.AddUserRequest;
import com.joshuamathia.shopez.shopezapp.payload.response.MessageResponse;
import com.joshuamathia.shopez.shopezapp.repository.UserRepository;
import com.joshuamathia.shopez.shopezapp.repository.HomeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/auth/homes")
public class HomeController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    HomeRepository homeRepository;

    // Return all houses
    @GetMapping("/showall")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Home>> getHomes(@RequestParam(required = false) String name)
    {
        try {
            List<Home> homes = new ArrayList<>();
            if(name == null) {
                homeRepository.findAll().forEach(homes::add);
            }
            else {
                homeRepository.findByNameContaining(name).forEach(homes::add);
            }
            if (homes.isEmpty()){
               return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
            }
            return new ResponseEntity<>(homes, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Return list of homes for the user

    @GetMapping("/userhomes/{username}")
    @PreAuthorize("#username == authentication.principal.username or hasRole('ADMIN')")
    public ResponseEntity<List<Home>> getUserHomes(@PathVariable("username") String username)
    {
        try {
            List<Home> homes = new ArrayList<>();
            if(username == null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            else {
              Optional<User> user = userRepository.findByUsername(username);
              homes.addAll(user.get().getHomes());
               return new ResponseEntity<>(homes, HttpStatus.OK);
            }
            //    User _user = user.get();
               
            //    if(_user.getHomes().size() != 0){

            //    }
               
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Creates a home
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Home> createHome(@RequestBody Home home) {
        try {
            // if(homeRepository.existsByName(home.getName())){
            //     return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            // }
            // else {
                Home _home = homeRepository.save(new Home(home.getName()));
                return new ResponseEntity<>(_home, HttpStatus.CREATED);
            // }
        } catch(Exception e ){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/adduser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addUserToHome( @Valid @RequestBody AddUserRequest addUserRequest) {
        

        // Get users 
        String username = addUserRequest.getUsername();
        String name = addUserRequest.getName();

        Optional<User> user = userRepository.findByUsername(username);

        Optional<Home> home = homeRepository.findByName(name);
        
        if(user.isPresent() && home.isPresent()){

            Set<Home> homesList = new HashSet<>();
            List<User> userList = new ArrayList<>();
            
            User _user = user.get();
            Home _home = home.get();

            if (_user.getHomes().isEmpty()) {
                homesList.add(_home);
            }
            else {
               homesList = _user.getHomes();
               homesList.add(_home);
            }

            if(_home.getUsers().isEmpty()) {
                userList.add(_user);
            }
            else {
                 userList = _home.getUsers();
                 userList.add(_user);
            }
            
            _user.setHomes(homesList);
            _home.setUsers(userList);
            userRepository.save(_user);
            homeRepository.save(_home);
            return ResponseEntity.ok(new MessageResponse("The user's home was added successfully!"));
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/showlists/{homename}")
    public ResponseEntity<?> showLists(@PathVariable("homename")String homeName){

        Optional<Home> home = homeRepository.findByName(homeName);

        if(home.isPresent()){
            return new ResponseEntity<>(home.get().getHomeShoppingLists(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
