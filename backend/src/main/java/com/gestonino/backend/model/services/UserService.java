package com.gestonino.backend.model.services;

import com.gestonino.backend.model.dao.UserDAO;
import com.gestonino.backend.model.types.User;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class UserService {

    private final UserDAO userDAO;

    public UserService() throws SQLException {
        this.userDAO = new UserDAO();
    }

    public Optional<User> findById(Long id) throws SQLException {
        return userDAO.findById(id);
    }

    public Optional<User> findByEmail(String email) throws SQLException {
        return userDAO.findByEmail(email);
    }

    public List<User> findAll() throws SQLException {
        return userDAO.findAll();
    }

    public void save(User user) throws SQLException {
        userDAO.save(user);
    }

    public void delete(Long id) throws SQLException {
        userDAO.delete(id);
    }
}
