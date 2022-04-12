package com.joshuamathia.shopez.shopezapp.exception;
import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(Exception.class)
  @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
  public ErrorMessage TokenExpiryException(Exception ex, WebRequest request) {

    ErrorMessage message = new ErrorMessage(
                HttpStatus.UNAUTHORIZED.value(),
                new Date(),
                ex.getMessage(),
                request.getDescription(false));
    return message;
  }
 // For Token 
  @ExceptionHandler(value = TokenRefreshException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public ErrorMessage handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage(
        HttpStatus.FORBIDDEN.value(),
        new Date(),
        ex.getMessage(),
        request.getDescription(false));
    return message;
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(value = HttpStatus.NOT_FOUND)
  public ErrorMessage resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage(
        HttpStatus.NOT_FOUND.value(),
        new Date(),
        ex.getMessage(),
        request.getDescription(false));
    
    return message;
  }
  
  // @ExceptionHandler(Exception.class)
  // @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
  // public ErrorMessage globalExceptionHandler(Exception ex, WebRequest request) {
  //   ErrorMessage message = new ErrorMessage(
  //       HttpStatus.INTERNAL_SERVER_ERROR.value(),
  //       new Date(),
  //       ex.getMessage(),
  //       request.getDescription(false));
    
  //   return message;
  // }
}