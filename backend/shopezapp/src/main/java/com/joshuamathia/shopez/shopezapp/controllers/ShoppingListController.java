package com.joshuamathia.shopez.shopezapp.controllers;

import com.joshuamathia.shopez.shopezapp.security.services.HomeService;
import com.joshuamathia.shopez.shopezapp.security.services.IGetAuthentication;
import com.joshuamathia.shopez.shopezapp.security.services.ItemServiceImpl;
import com.joshuamathia.shopez.shopezapp.security.services.ShoppingListServiceImpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.joshuamathia.shopez.shopezapp.models.Home;
import com.joshuamathia.shopez.shopezapp.models.Item;
import com.joshuamathia.shopez.shopezapp.models.ShoppingList;
import com.joshuamathia.shopez.shopezapp.models.User;
import com.joshuamathia.shopez.shopezapp.payload.request.CreateShoppingListRequest;
import com.joshuamathia.shopez.shopezapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/list")
public class ShoppingListController {

    @Autowired
    ItemServiceImpl itemServiceImpl;
    @Autowired
    ShoppingListServiceImpl shoppingListServiceImpl;

    @Autowired
    HomeService homeService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private IGetAuthentication iGetAuthentication;

    @GetMapping("/display/{id}")
    public ResponseEntity<ShoppingList> showList(@PathVariable("id") long id) {

        Optional<ShoppingList> shoppingList = shoppingListServiceImpl.findById(id);

        if (shoppingList.isPresent()) {
            return new ResponseEntity<>(shoppingList.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody CreateShoppingListRequest shoppingListRequest) {

        try {
            ShoppingList _shoppingList = new ShoppingList();
            String homeName = shoppingListRequest.getHomeName();
            Optional<Home> requestedHome = homeService.findByName(homeName);

            Authentication authentication = iGetAuthentication.getAuthentication();
            String username = authentication.getName();

            Optional<User> user = userRepository.findByUsername(username);
            Set<Home> userHomes = new HashSet<>();
            if (user.isPresent()) {
                userHomes.addAll(user.get().getHomes());
            }

            if (requestedHome.isPresent() && userHomes.contains(requestedHome.get())) {

                for (Item item : shoppingListRequest.getItems()) {

                    String title = item.getTitle();
                    Optional<Item> searchedItem = itemServiceImpl.findByTitle(title);
                    if (searchedItem.isPresent()) {
                        item = searchedItem.get();
                        _shoppingList.addItem(item);
                    }
                }
                List<Home> shoppingListHomes = new ArrayList<>();
                shoppingListHomes.add(requestedHome.get());
                _shoppingList.setShoppingListhomes(shoppingListHomes);
                _shoppingList = shoppingListServiceImpl.saveShoppingList(requestedHome, shoppingListRequest.getTitle(),
                        _shoppingList.getShoppingList());
                
        
                return new ResponseEntity<>(_shoppingList, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
               

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
