package com.joshuamathia.shopez.shopezapp.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
//import java.util.List;

@Entity
@Table (name = "items")
public class Home {
    @Id
    @Column(name="HOME_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long homeId;
    @Column(name="name")
    private String name;
    // //To figure out where and how to manipulate the users & functions
    // @Column(name="caregivers")
    // List <Caregiver> caregivers;
    // @Column(name="shoppers")
    // List <Shopper> shoppers;

    //Home Class Methods
    public Home() {
    }

    public Home(String name) {
        this.name = name;
    }
    public Long getId(){
        return this.homeId;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    // public List<Caregiver> getCaregivers() {
    //     return this.caregivers;
    // }

    // public List<Shopper> getShoppers() {
    //     return this.shoppers;
    // }

        // Admin should be able to edit this function will figure out implementation later
    // private void setCaregivers(List<Caregivers> caregivers){
    //     this.caregivers = caregivers;
    // }

    // private void setShoppers(List<Shoppers> shoppers) {
    //     this.shoppers = shoppers;
    // }
}
