package com.joshuamathia.shopez.shopezapp.security.services;

import java.util.Optional;
import com.joshuamathia.shopez.shopezapp.models.ShoppingList;
import com.joshuamathia.shopez.shopezapp.repository.ShoppingListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;


@Service
public class ShoppingListService {
    @Autowired
    ShoppingListRepository shoppingListRepository;

    public Optional<ShoppingList> findByTitle(String title) throws NotFoundException {
        return shoppingListRepository.findByTitle(title);
    }
    public Boolean existsByTitle(String title){
        return shoppingListRepository.existsByTitle(title);
    }

    public Optional<ShoppingList> findById(int id) throws NotFoundException {
        return shoppingListRepository.findById(id);
    }
}
