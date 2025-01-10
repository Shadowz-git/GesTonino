package com.gestonino.backend.model.services;

import com.gestonino.backend.model.dao.ProductDAO;
import com.gestonino.backend.model.types.Product;

import java.sql.SQLException;
import java.util.List;

public class ProductService {

    private final ProductDAO productDAO;

    public ProductService() throws SQLException {
        this.productDAO = new ProductDAO();
    }

    public List<Product> findByActivityId(Long activityId) throws SQLException {
        return productDAO.findByActivityId(activityId);
    }

    public Product findById(Long id) throws SQLException {
        return productDAO.findById(id);
    }

    public void save(Product product) throws SQLException {
        productDAO.save(product);
    }

    public void delete(Long id) throws SQLException {
        productDAO.delete(id);
    }
}
