package com.joshuamathia.shopez.shopezapp.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole roleName;
    public Role() {}
    public Role(ERole roleName) {
        this.roleName = roleName;
    }
  
    // getters & setters

    public Integer getRoleId() {
        return this.id;
    }

    public void setRole(Integer id) {
        this.id = id;
    }
    
    public ERole getRoleName() {
        return this.roleName;
    }
    
    public void setRoleName(ERole roleName) {
        this.roleName = roleName;
    }
}
