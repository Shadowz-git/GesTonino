package com.gestonino.backend.controllers;

import com.gestonino.backend.model.JwtUtil;
import com.gestonino.backend.model.exceptions.InvalidEmailException;
import com.gestonino.backend.model.exceptions.UserAlreadyExistException;
import com.gestonino.backend.model.requests.UserLoginRequest;
import com.gestonino.backend.model.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        System.out.println("Login: "+request.getEmail()+request.getPassword());
        Map<String, String> response = new HashMap<>();

        if (authService.validateCredentials(request.getEmail(), request.getPassword())) {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            String token = jwtUtil.generateToken(auth);
            response.put("token", token);
            return ResponseEntity.ok(response);
        }

        response.put("error", "Invalid email or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserLoginRequest request) {
        Map<String, String> response = new HashMap<>();

        //Il problema dell'avviso di errore ma della corretta esecuzione della query è dato dal modo sbagliato in cui mandavamo
        //la response, noi lo mandavamo come testo normale, però adesso con la mappa viene gestito come un JSON in modo che
        //riesca ad interpretarlo il frontend
        // OKE, CAPIT
        try {
            authService.registerUser(request.getEmail(), request.getPassword());
            // Risposta con JSON
            response.put("message", "Registrazione avvenuta con successo");
            return ResponseEntity.ok(response);
        } catch (UserAlreadyExistException e) {
            response.put("error", "L'utente esiste già");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (InvalidEmailException e) {
            response.put("error", "Email invalida");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

}