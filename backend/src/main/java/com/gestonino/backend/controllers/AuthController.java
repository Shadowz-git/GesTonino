package com.gestonino.backend.controllers;

import com.gestonino.backend.model.JwtUtil;
import com.gestonino.backend.model.dao.ActivityRepository;
import com.gestonino.backend.model.dao.UserRepository;
import com.gestonino.backend.model.exceptions.InvalidEmailException;
import com.gestonino.backend.model.exceptions.UserAlreadyExistException;
import com.gestonino.backend.model.requests.UserLoginRequest;
import com.gestonino.backend.model.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    ActivityRepository activityRepository;
    @Autowired
    UserRepository userRepository;


    @Autowired
    private JwtUtil jwtUtil;

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request, HttpServletResponse response) {
        Map<String, Object> responseMap = new HashMap<>();

        if (authService.validateCredentials(request.getEmail(), request.getPassword())) {
            String token = jwtUtil.generateToken(request.getEmail()); // Genera il token usando l'email (username)

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60); // 1 giorno
            response.addCookie(cookie);
            long user_id=userRepository.findByEmail(request.getEmail()).getId();
            List<Object[]> activity_idname=activityRepository.findIdAndNameByUserId(user_id);

            List<String> stringList = new ArrayList<>();

            // Trasforma i risultati in stringhe
            for (Object[] result : activity_idname) {
                stringList.add(result[0].toString());
                stringList.add(result[1].toString());
            }
            System.out.println("activity in base a utente di id"+user_id+" Attività con id:"+stringList.getFirst()+" Nome:"+stringList.getLast());
            responseMap.put("user_id", user_id);
            if(!activity_idname.isEmpty()) {
                responseMap.put("activity_id", stringList.getFirst());
                responseMap.put("activity_name", stringList.getLast());
            }
            responseMap.put("token", token);
            responseMap.put("user", request.getEmail());
            return ResponseEntity.ok(responseMap); // Restituisci la mappa di risposta
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
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