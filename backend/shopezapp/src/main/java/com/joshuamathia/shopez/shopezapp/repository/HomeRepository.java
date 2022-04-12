package com.joshuamathia.shopez.shopezapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import com.joshuamathia.shopez.shopezapp.models.Home;

@Repository
public interface HomeRepository extends JpaRepository<Home, Long> {
    Optional<Home> findByName(String name);
    Boolean existsByName(String name);
    List<Home> findByNameContaining(String name);
}
