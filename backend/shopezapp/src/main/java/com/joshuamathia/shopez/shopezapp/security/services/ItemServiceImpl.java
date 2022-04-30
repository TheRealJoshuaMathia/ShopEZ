package com.joshuamathia.shopez.shopezapp.security.services;

import java.util.List;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.Item;
import com.joshuamathia.shopez.shopezapp.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

    public List<Item> findByTitleContaining(String title){
        return itemRepository.findByTitleContaining(title);
        
    }

    public Optional<Item> findById(long id) {
        return itemRepository.findById(id);
    }

    public Optional<Item> findByTitle(String title) {
        return itemRepository.findByTitle(title);
    }
    
    public Item saveItem(Item item){

        Item _item = new Item();
        _item.setTitle(item.getTitle());
        _item.setType(item.getType());
        _item.setCatagory(item.getCatagory());
        _item.setStore(item.getStore());
        _item.setQuantity(item.getQuantity());

        _item = itemRepository.save(_item);

        return _item;
    }
}
