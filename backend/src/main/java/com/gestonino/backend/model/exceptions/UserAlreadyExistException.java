package com.gestonino.backend.model.exceptions;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException() {
        super("Username already exists");
    }
}
