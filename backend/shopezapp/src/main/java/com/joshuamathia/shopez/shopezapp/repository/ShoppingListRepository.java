package com.joshuamathia.shopez.shopezapp.repository;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.ShoppingList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    Optional<ShoppingList> findByTitle(String title);
    Optional<ShoppingList> findById(long id);
    Boolean existsByTitle(String title);
}
