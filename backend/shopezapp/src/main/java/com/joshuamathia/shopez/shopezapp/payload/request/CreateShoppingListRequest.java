package com.joshuamathia.shopez.shopezapp.payload.request;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.joshuamathia.shopez.shopezapp.models.Item;


public class CreateShoppingListRequest {
    
    @JsonRawValue
    @NotBlank
    private String homeName;
    @JsonRawValue
    @NotBlank
    private String title;
    @JsonRawValue
    private List<Item> shoppingList = new ArrayList<>();

    public String getHomeName() {
        return homeName;
    }

    public void setHomeName(String homeName) {
        this.homeName = homeName;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public List<Item> getItems(){
        return shoppingList;
    }
    public void setItems(List<Item> shoppingList) {
        this.shoppingList = shoppingList;
    }
}
