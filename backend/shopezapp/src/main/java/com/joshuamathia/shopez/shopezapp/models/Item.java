package com.joshuamathia.shopez.shopezapp.models;
/**
 * Item
 */

 import javax.persistence.Entity;
 import javax.persistence.GeneratedValue;
 import javax.persistence.GenerationType;
 import javax.persistence.Id;
 import javax.persistence.Table;
 import javax.persistence.Column;

 @Entity
 @Table(name="items")
public class Item {
    @Id
    @Column(name="ITEM_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name="title")
    private String title;
    @Column(name="typeofItem")
    private String type;
    @Column(name="catagory")
    private String catagory;
    @Column(name="store")
    private String store;

    public Item() {
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
}