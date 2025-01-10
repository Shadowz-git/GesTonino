package com.gestonino.backend.controllers;

import com.gestonino.backend.model.exceptions.InvalidEmailException;
import com.gestonino.backend.model.exceptions.UserAlreadyExistException;
import com.gestonino.backend.model.requests.UserLoginRequest;
import com.gestonino.backend.model.services.AuthService;
import com.gestonino.backend.model.services.UserService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/login")
    public boolean login(@RequestBody UserLoginRequest request) {
        System.out.println(request);
        return authService.validateCredentials(request.getEmail(), request.getPassword());
    }

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserLoginRequest request){
        System.out.println("Register: "+request.toString());
        try{
            System.out.println("Sono nel try: "+request.getEmail()+request.getPassword());
            authService.registerUser(request.getEmail(), request.getPassword());
            return ResponseEntity.ok("Registrazione avvenuta con successo");
        }catch (UserAlreadyExistException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("L'utente esiste già");
        }catch (InvalidEmailException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email invalida");
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}