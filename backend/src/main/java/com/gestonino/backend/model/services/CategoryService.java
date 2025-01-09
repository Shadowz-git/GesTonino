package com.gestonino.backend.model.services;

import com.gestonino.backend.model.dao.CategoryDAO;
import com.gestonino.backend.model.types.Category;

import java.sql.SQLException;
import java.util.List;

public class CategoryService {

    private final CategoryDAO categoryDAO;

    public CategoryService() throws SQLException {
        this.categoryDAO = new CategoryDAO();
    }

    public List<Category> findAll() throws SQLException {
        return categoryDAO.findAll();
    }

    public Category findById(Long id) throws SQLException {
        return categoryDAO.findById(id);
    }

    public void save(Category category) throws SQLException {
        categoryDAO.save(category);
    }

    public void delete(Long id) throws SQLException {
        categoryDAO.delete(id);
    }
}
