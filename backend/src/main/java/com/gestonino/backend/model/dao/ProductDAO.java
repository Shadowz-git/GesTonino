package com.gestonino.backend.model.dao;


import com.gestonino.backend.model.db.DatabaseManager;
import com.gestonino.backend.model.types.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    private final Connection connection;

    public ProductDAO() throws SQLException {
        this.connection = DatabaseManager.getInstance().getConnection();
    }

    public List<Product> findByActivityId(Long activityId) throws SQLException {
        String query = "SELECT * FROM products WHERE activity_id = ?";
        List<Product> products = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, activityId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                products.add(mapResultSetToProduct(rs));
            }
        }
        return products;
    }

    public Product findById(Long id) throws SQLException {
        String query = "SELECT * FROM products WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToProduct(rs);
            }
        }
        throw new SQLException("Product not found");
    }

    public void save(Product product) throws SQLException {
        String query = "INSERT INTO products (name, code, price, quantity, discount, category_id, activity_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, product.getName());
            stmt.setString(2, product.getCode());
            stmt.setDouble(3, product.getPrice());
            stmt.setInt(4, product.getQuantity());
            stmt.setDouble(5, product.getDiscount());
            stmt.setLong(6, product.getCategory().getId());
            stmt.setLong(7, product.getActivity().getId());
            stmt.executeUpdate();
        }
    }

    public void delete(Long id) throws SQLException {
        String query = "DELETE FROM products WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    private Product mapResultSetToProduct(ResultSet rs) throws SQLException {
        Product product = new Product();
        product.setId(rs.getLong("id"));
        product.setName(rs.getString("name"));
        product.setCode(rs.getString("code"));
        product.setPrice(rs.getDouble("price"));
        product.setQuantity(rs.getInt("quantity"));
        product.setDiscount(rs.getDouble("discount"));
        // Nota: L'oggetto `Category` e `Activity` devono essere caricati separatamente se necessario
        return product;
    }
}
