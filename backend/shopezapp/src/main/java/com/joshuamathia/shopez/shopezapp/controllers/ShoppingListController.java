package com.joshuamathia.shopez.shopezapp.controllers;

import com.joshuamathia.shopez.shopezapp.repository.ItemRepository;

import com.joshuamathia.shopez.shopezapp.security.services.ShoppingListServiceImpl;

import java.util.Optional;


import com.joshuamathia.shopez.shopezapp.models.ShoppingList;
import com.joshuamathia.shopez.shopezapp.payload.request.CreateShoppingListRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    ItemRepository itemRepository;
    @Autowired
    ShoppingListServiceImpl shoppingListServiceImpl;

    @GetMapping("/display/{id}")
    public ResponseEntity<ShoppingList> showList(@PathVariable("id") long id){
        
        Optional<ShoppingList> shoppingList = shoppingListServiceImpl.findByShoppingListId(id);

        if(shoppingList.isPresent()){
            return new ResponseEntity<>(shoppingList.get(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity <ShoppingList> createShoppingList(@RequestBody CreateShoppingListRequest shoppingListRequest) {
        
        try {
            ShoppingList _shoppingList = shoppingListServiceImpl.saveShoppingList(shoppingListRequest.getTitle(), shoppingListRequest.getItems());

            return new ResponseEntity<>(_shoppingList, HttpStatus.OK);
        } catch (Exception e ){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
