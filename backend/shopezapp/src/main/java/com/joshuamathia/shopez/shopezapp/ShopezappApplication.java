package com.joshuamathia.shopez.shopezapp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class ShopezappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopezappApplication.class, args);
	}
}
