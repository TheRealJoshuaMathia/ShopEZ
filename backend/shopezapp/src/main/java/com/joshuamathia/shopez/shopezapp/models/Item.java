package com.joshuamathia.shopez.shopezapp.models;
/**
 * Item
 */

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;

 @Entity
 @Table(name="items")

public class Item implements Serializable{
    
    // @ManyToOne(targetEntity = ShoppingList.class,
    //         fetch = FetchType.LAZY,
    //         cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    //         @JoinColumn(name="shoppingList_id")
    // private ShoppingList shoppingList;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_id", unique = true)
    private long id;
    @Column(name="title")
    private String title;
    @Column(name="type", nullable = true)
    private String type;
    @Column(name="catagory", nullable = true)
    private String catagory;
    @Column(name="store")
    private String store;
    @Column(name="quantity", nullable = true)
    private int quantity;

    
     @ManyToMany(fetch = FetchType.LAZY,
    cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    }, 
    mappedBy = "itemList")
    @JsonIgnore
    private List<ShoppingList> itemList = new ArrayList<>();

    public List<ShoppingList> getItemList() {
        return itemList;
    }

    public void setItemList(List <ShoppingList> itemList) {
        this.itemList = itemList;
    }

    // Need to figure out how to edit the quantity of the item
    // Will a copy of the object need to be made within ShoppingList class ??
    // @Column(name="column")
    // private Integer quantity;

    public Item() {
    }

    public Item(Item item ){

    }

    public Item(String title, String type, String catagory, String store) {
        this.title = title;
        this.type = type;
        this.catagory = catagory;
        this.store = store;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
       this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
       this.type = type;
    }

    public String getCatagory() {
        return catagory;
    }

    public void setCatagory(String catagory) {
       this.catagory = catagory;
    }

    public String getStore() {
        return store;
    }
    
    public void setStore(String store) {
       this.store = store;
    }
    public int getQuantity(){
        return quantity;
    }
    public void setQuantity(int quantity){
        this.quantity = quantity;
    }

    // // @ManyToOne(fetch = FetchType.LAZY)
    // // @JoinColumn(name = "item_id", insertable = false, updatable = false)
    // public ShoppingList getShoppingList(){
    //     return shoppingList;
    // }
    // public void setShoppingList(ShoppingList shoppingList){
    //     this.shoppingList = shoppingList;
    // }
}