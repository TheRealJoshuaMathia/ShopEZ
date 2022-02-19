package com.joshuamathia.shopez.shopezapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.joshuamathia.shopez.shopezapp.models.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByTitleContaining(String title);
}
