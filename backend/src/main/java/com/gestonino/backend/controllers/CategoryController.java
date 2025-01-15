package com.gestonino.backend.controllers;

import com.gestonino.backend.model.dao.CategoryRepository;
import com.gestonino.backend.model.types.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> getAllCategories() {


        List<Category> categories = categoryRepository.findAll();
        System.out.println("CATEGORIES"+categoryRepository.findAll());
        for (Category category : categories) {

            System.out.println("qua"+category);
        }
        return categoryRepository.findAll();
    }
}