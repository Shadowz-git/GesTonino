package com.gestonino.backend.model.dao;

import com.gestonino.backend.model.types.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
