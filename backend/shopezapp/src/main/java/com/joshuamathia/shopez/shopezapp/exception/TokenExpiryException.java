package com.joshuamathia.shopez.shopezapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class TokenExpiryException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public TokenExpiryException(String msg) {
        super(msg);
    }
}
