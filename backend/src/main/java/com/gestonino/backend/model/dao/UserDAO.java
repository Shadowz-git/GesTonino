package com.gestonino.backend.model.dao;


import com.gestonino.backend.model.db.DatabaseManager;
import com.gestonino.backend.model.types.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserDAO {

    private final Connection connection;

    public UserDAO() throws SQLException {
        this.connection = DatabaseManager.getInstance().getConnection();
    }

    public Optional<User> findById(Long id) throws SQLException {
        String query = "SELECT * FROM users WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                User user = mapResultSetToUser(rs);
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public Optional<User> findByEmail(String email) throws SQLException {
        String query = "SELECT * FROM users WHERE email = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                User user = mapResultSetToUser(rs);
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public List<User> findAll() throws SQLException {
        String query = "SELECT * FROM users";
        List<User> users = new ArrayList<>();
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                users.add(mapResultSetToUser(rs));
            }
        }
        return users;
    }

    public void save(User user) throws SQLException {
        String query = "INSERT INTO users (email, password) VALUES (?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, user.getEmail());
            stmt.setString(2, user.getPassword());
            stmt.executeUpdate();
        }
    }

    public void delete(Long id) throws SQLException {
        String query = "DELETE FROM users WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    }
}
