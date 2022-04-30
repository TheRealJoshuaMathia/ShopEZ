package com.joshuamathia.shopez.shopezapp.security.services;

import java.util.List;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.Item;

public interface ItemService {
    public List<Item> findByTitleContaining(String title);

    public Optional<Item> findById(long id);
    public Optional<Item> findByTitle(String title);
    public Item saveItem(Item item);
}
