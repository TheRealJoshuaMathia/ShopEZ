package com.joshuamathia.shopez.shopezapp.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="name")
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_homes",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name="home_id")
    )
    @JsonIgnoreProperties("homes")
   private List<User> users = new ArrayList<>();

    //Home Class Methods
    public Home() {
    }

    public Home(String name) {
        this.name = name;
    }
    public Long getId(){
        return id;
    }
    public Long setId(Long id){
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
        return users;
    }
    public void setUsers(List<User> users) {
        this.users = users;
    }
}
