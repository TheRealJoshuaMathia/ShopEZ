package com.joshuamathia.shopez.shopezapp.security.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.Home;
import com.joshuamathia.shopez.shopezapp.models.Item;
import com.joshuamathia.shopez.shopezapp.models.ShoppingList;
import com.joshuamathia.shopez.shopezapp.repository.ShoppingListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ShoppingListServiceImpl implements ShoppingListService{
    
    @Autowired
    ShoppingListRepository shoppingListRepository;

    public ShoppingList saveShoppingList(Optional<Home> requestedHome , String title, List<Item> items){
        
        ShoppingList shoppingList = new ShoppingList();
        List<Item> itemList = new ArrayList<>();

        List<Home> homes = new ArrayList<>();
        homes.add(requestedHome.get());

        for(Item item : items){
            itemList.add(item);
        }

        shoppingList.setTitle(title);
        shoppingList.setShoppingList(itemList);
        shoppingList.setShoppingListhomes(homes);

        shoppingList = shoppingListRepository.save(shoppingList);

        return shoppingList;
    }

    public Optional<ShoppingList> findById(long id){
      return shoppingListRepository.findById(id);
    }
}
