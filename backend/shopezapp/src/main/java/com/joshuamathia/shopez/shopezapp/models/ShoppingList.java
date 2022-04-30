package com.joshuamathia.shopez.shopezapp.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import javax.persistence.Table;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "shoppinglists")
public class ShoppingList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "shoppinglist_id", unique = true)
    private long id;

    @Column(name="title")
    private String title;

    // @Column(name = "date")
    // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    // @JsonFormat(pattern = "MM/dd/yyyy")
    // private LocalDate date;

  
    //@JsonIgnoreProperties("item")


    @ManyToMany(fetch = FetchType.LAZY,
    cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    })
    @JoinTable(name = "shoppinglist_items",
        joinColumns = {@JoinColumn(name = "shoppinglist_id")},
        inverseJoinColumns = { @JoinColumn(name = "item_id") })
    @JsonIgnoreProperties("shoppinglists")
    private List<Item> itemList = new ArrayList<>();

    public void addItem(Item item) {
        itemList.add(item);
    }

    // public void removeItem(Item item) {
    //     shoppingList.remove(item);
    // }

    public ShoppingList(){
    }

    public ShoppingList(String title, List<Item> itemList){
        this.title = title;
        this.itemList = itemList;
    }

    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }
    
    // public LocalDate getDate(){
    //     return date;
    // }
    // public void setDate(LocalDate date){
    //     this.date = date;
    // }

    public void setShoppingList(List<Item> shoppingList){
        this.itemList = shoppingList;
    }
   
    public List<Item> getShoppingList() {
        return itemList;
    }
}
