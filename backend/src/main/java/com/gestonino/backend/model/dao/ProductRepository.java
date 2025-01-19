package com.gestonino.backend.model.dao;
import com.gestonino.backend.model.types.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActivityId(Long activityId);


    @Query("SELECT p FROM Product p WHERE " +
            "(:query IS NULL OR p.name LIKE %:query%) AND " +
            "(:validMinPrice IS NULL OR p.price >= :validMinPrice) AND " +
            "(:validMaxPrice IS NULL OR p.price <= :validMaxPrice) AND " +
            "p.activity.id IN :activityIds")
    List<Product> findProductsByActivityIds(
            @Param("query") String query,
            @Param("validMinPrice") Double validMinPrice,
            @Param("validMaxPrice") Double validMaxPrice,
            @Param("activityIds") List<Long> activityIds
    );

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.name = :name, p.quantity = :quantity, p.price = :price, p.discount = :discount, p.category.id = :category_id WHERE p.code = :code AND p.activity.id = :activity_id")
    void updateProductByCodeAndActivityId(@Param("code") String code,
                                          @Param("activity_id") String activity_id,
                                          @Param("name") String name,
                                          @Param("quantity") int quantity,
                                          @Param("price") double price,
                                          @Param("discount") double discount,
                                          @Param("category_id") String category_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.code IN :codes AND p.activity.id = :activityId")
    void deleteByCodesAndActivityId(@Param("codes") List<String> codes, @Param("activityId") Long activityId);

    long countByActivityIdAndQuantityGreaterThanEqualAndQuantityLessThan(Long activityId, int minQuantity, int maxQuantity);
    long countByActivityIdAndQuantity(Long activityId, int quantity);

    @Query("SELECT SUM(i.quantity) FROM Product i WHERE i.activity.id = :activity_id")
    Long sumQuantityByIdActivity(@Param("activity_id") Long idActivity);


    //TODO: Totale va moltiplicato in base alla quantità
    @Query("SELECT SUM(i.price) FROM Product i WHERE i.activity.id = :activity_id")
    Long sumTotalByIdActivity(@Param("activity_id") Long idActivity);


}
