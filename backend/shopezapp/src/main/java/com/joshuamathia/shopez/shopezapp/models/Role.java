package com.joshuamathia.shopez.shopezapp.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    @ManyToMany(fetch = FetchType.LAZY,
    cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    },
    mappedBy = "roles")
    @JsonIgnore
    private Set<User> userRoles = new HashSet<>();

    public Role() {}
    public Role(ERole name) {
        this.name = name;;
    }
  
    // getters & setters

    public Set<User> getUserRoles(){
        return userRoles;
    }

    public void setUserRoles(Set<User> userRoles){
        this.userRoles = userRoles;
    }

    public long getRoleId() {
        return this.id;
    }

    public void setRole(long id) {
        this.id = id;
    }
    
    public ERole getRoleName() {
        return this.name;
    }
    
    public void setRoleName(ERole name) {
        this.name = name;
    }
}
