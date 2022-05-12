package com.joshuamathia.shopez.shopezapp.security.services;

import java.util.List;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.Home;
import com.joshuamathia.shopez.shopezapp.models.Item;
import com.joshuamathia.shopez.shopezapp.models.ShoppingList;
import org.springframework.stereotype.Component;
@Component
public interface ShoppingListService {
    public ShoppingList saveShoppingList(Optional<Home> requestedHome, String title, List<Item> items);
    public Optional<ShoppingList> findById(long id);
}
