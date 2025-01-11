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

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/login")
    public boolean login(@RequestBody UserLoginRequest request) {
        System.out.println("Login: "+request.getEmail()+request.getPassword());
        return authService.validateCredentials(request.getEmail(), request.getPassword());
    }

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserLoginRequest request) {

        //Il problema dell'avviso di errore ma della corretta esecuzione della query è dato dal modo sbagliato in cui mandavamo
        //la response, noi lo mandavamo come testo normale, però adesso con la mappa viene gestito come un JSON in modo che
        //riesca ad interpretarlo il frontend
        System.out.println("Register: " + request.toString());
        try {
            System.out.println("Sono nel try: " + request.getEmail() + request.getPassword());
            authService.registerUser(request.getEmail(), request.getPassword());
            // Risposta con JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "Registrazione avvenuta con successo");
            return ResponseEntity.ok(response);
        } catch (UserAlreadyExistException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "L'utente esiste già");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (InvalidEmailException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Email invalida");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

}