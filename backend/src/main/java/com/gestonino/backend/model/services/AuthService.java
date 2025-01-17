package com.gestonino.backend.model.services;

import com.gestonino.backend.model.dao.UserRepository;
import com.gestonino.backend.model.exceptions.InvalidEmailException;
import com.gestonino.backend.model.exceptions.UserAlreadyExistException;
import com.gestonino.backend.model.types.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;


// Regex per verificare un'email valida


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";


    public boolean validateCredentials(String email, String password) {
        User user = userRepository.findByEmail(email);
        return user != null && BCrypt.checkpw(password, user.getPassword());
    }

    public boolean registerUser(String email, String password) {
        boolean existUser=userRepository.existsByEmail(email);
        if(existUser) {
           throw new UserAlreadyExistException();
        }
        if(!isValidEmail(email)) {
            System.out.println("Qui qualcosa non va "+email);
            throw new InvalidEmailException();
        }
        String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));
        userRepository.save(new User(email, encryptedPassword));
        return true;
    }

    public static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        return Pattern.matches(EMAIL_REGEX, email);
    }
}
