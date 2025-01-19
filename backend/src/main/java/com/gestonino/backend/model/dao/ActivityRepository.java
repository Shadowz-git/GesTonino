package com.gestonino.backend.model.dao;

import com.gestonino.backend.model.types.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query("SELECT a FROM Activity a WHERE " +
            "(:lat IS NULL OR :lng IS NULL OR :radius IS NULL OR " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(a.latitude)) * " +
            "cos(radians(a.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(a.latitude)))) <= :radius)")
    List<Activity> findActivitiesInRadius(
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("radius") Double radius
    );

    @Query("SELECT a.id, a.name FROM Activity a WHERE a.user.id = :user_id")
    List<Object[]> findIdAndNameByUserId(@Param("user_id") Long user_id);
}
