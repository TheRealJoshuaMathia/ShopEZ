package com.joshuamathia.shopez.shopezapp.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;

@Entity
@Table(name = "homes")
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private long id;

    @Column(name="name")
    private String name;

     @Fetch(value = FetchMode.SUBSELECT)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_homes",
            joinColumns = @JoinColumn(name = "home_id"),
            inverseJoinColumns = @JoinColumn(name="user_id")
    )
    @JsonIgnoreProperties("homes")
   
    private List<User> userHomesList = new ArrayList<>();
   
    @Fetch(value = FetchMode.SUBSELECT)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "home_shoppinglists",
            joinColumns = @JoinColumn(name = "home_id"),
            inverseJoinColumns = @JoinColumn(name = "shoppinglist_id")
    )
    //@JsonIgnore
    private List<ShoppingList> homeShoppingLists = new ArrayList<>();

    //Home Class Methods
    public Home() {
    }

    public Home(String name) {
        this.name = name;
    }
    public long getId(){
        return id;
    }
    public long setId(long id){
        return id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @JsonIgnore
    public List<User> getUsers(){
        return userHomesList;
    }
    public void setUsers(List<User> users) {
        this.userHomesList = users;
    }

    public List<ShoppingList> getHomeShoppingLists() {
        return homeShoppingLists;
    }

    public void setHomeShoppingLists(List<ShoppingList> homeShoppingLists) {
        this.homeShoppingLists = homeShoppingLists;
    }
}