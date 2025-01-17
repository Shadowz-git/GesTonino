package com.gestonino.backend.model.dao;
import com.gestonino.backend.model.types.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE " +
            "(:query IS NULL OR p.name LIKE %:query%) AND " +
            "(:validCategories IS NULL OR p.category IN :validCategories) AND " +
            "(:validMinPrice IS NULL OR p.price >= :validMinPrice) AND " +
            "(:validMaxPrice IS NULL OR p.price <= :validMaxPrice) AND " +
            "p.activity.id IN :activityIds")
    List<Product> findProductsByActivityIds(
            @Param("query") String query,
            @Param("validCategories") List<String> validCategories,
            @Param("validMinPrice") Double validMinPrice,
            @Param("validMaxPrice") Double validMaxPrice,
            @Param("activityIds") List<Long> activityIds
    );
}
