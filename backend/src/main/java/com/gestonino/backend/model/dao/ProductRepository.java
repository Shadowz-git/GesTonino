package com.gestonino.backend.model.dao;
import com.gestonino.backend.model.types.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
