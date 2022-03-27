package com.joshuamathia.shopez.shopezapp.controllers;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('CAREGIVER') or hasRole('SHOPPER') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/caregiver")
  @PreAuthorize("hasRole('CAREGIVER')")
  public String caregiverAccess() {
    return "Caregiver Board";
  }

  @GetMapping("/shopper")
  @PreAuthorize("hasRole('SHOPPER')")
  public String shopperAccess() {
    return "Shopper Board.";
  }
  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
}
