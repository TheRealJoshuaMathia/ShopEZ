package com.joshuamathia.shopez.shopezapp.controllers;

import com.joshuamathia.shopez.shopezapp.repository.ItemRepository;
import com.joshuamathia.shopez.shopezapp.repository.ShoppingListRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.Item;
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
    ShoppingListRepository shoppingListRepository;

    @GetMapping("/display/{id}")
    public ResponseEntity<ShoppingList> showList(@PathVariable("id") int id){
        
        Optional<ShoppingList> shoppingList = shoppingListRepository.findById(id);

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
          
            List<Item> shoppingList = new ArrayList<>();
            for(Item item: shoppingListRequest.getItems()){
                Item newItem = item;
                shoppingList.add(newItem);
            }
            ShoppingList _shoppingList = new ShoppingList();

            _shoppingList.setTitle(shoppingListRequest.getTitle());
            _shoppingList.setShoppingList(shoppingList);

            shoppingListRepository.save(_shoppingList);
            return new ResponseEntity<>(_shoppingList, HttpStatus.OK);
        } catch (Exception e ){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
