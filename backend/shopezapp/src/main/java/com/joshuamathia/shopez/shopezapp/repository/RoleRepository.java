package com.joshuamathia.shopez.shopezapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.joshuamathia.shopez.shopezapp.models.ERole;
import com.joshuamathia.shopez.shopezapp.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
