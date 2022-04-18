package com.joshuamathia.shopez.shopezapp.models;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "lists")
public class ShoppingList {
    @Id
    @Column(name="shoppingList_id" )
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="title")
    private String title;

    // @Column(name = "date")
    // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    // @JsonFormat(pattern = "MM/dd/yyyy")
    // private LocalDate date;

    @OneToMany(mappedBy = "shoppingList")
    @Column(name="list_data")
    private List<Item> shoppingList;

    public ShoppingList(){
       shoppingList = new ArrayList<>();
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
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
    public List<Item> getShoppingList() {
        return shoppingList;
    }
    public void setShoppingList(List<Item> shoppingList) {
        this.shoppingList = shoppingList;
    }
}
