package com.gestonino.backend.model.dao;


import com.gestonino.backend.model.db.DatabaseManager;
import com.gestonino.backend.model.types.Category;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoryDAO {

    private final Connection connection;

    public CategoryDAO() throws SQLException {
        this.connection = DatabaseManager.getInstance().getConnection();
    }

    public List<Category> findAll() throws SQLException {
        String query = "SELECT * FROM categories";
        List<Category> categories = new ArrayList<>();
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                categories.add(mapResultSetToCategory(rs));
            }
        }
        return categories;
    }

    public Category findById(Long id) throws SQLException {
        String query = "SELECT * FROM categories WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToCategory(rs);
            }
        }
        throw new SQLException("Category not found");
    }

    public void save(Category category) throws SQLException {
        String query = "INSERT INTO categories (name) VALUES (?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, category.getName());
            stmt.executeUpdate();
        }
    }

    public void delete(Long id) throws SQLException {
        String query = "DELETE FROM categories WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    private Category mapResultSetToCategory(ResultSet rs) throws SQLException {
        Category category = new Category();
        category.setId(rs.getLong("id"));
        category.setName(rs.getString("name"));
        return category;
    }
}
