package com.joshuamathia.shopez.shopezapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.joshuamathia.shopez.shopezapp.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    public List<Item> findByTitleContaining(String title);

    public Optional<Item> findByTitle(String title);
    public Optional<Item> findById(long id);
    
}
