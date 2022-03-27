package com.joshuamathia.shopez.shopezapp;
import com.joshuamathia.shopez.shopezapp.models.*;

public class UsersTest {
    
    public void UserTest() {
        User user1 = new User();

        user1.setFirstName("John");
        System.out.println(user1.getFirstName());
    }

    public void displayName(){

    }
   
    
    public static void main(String[] args) {
        UsersTest user = new UsersTest();
        UsersTest admin = new UsersTest();
        user.UserTest();
     
    }  
}

 


