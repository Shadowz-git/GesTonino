package com.gestonino.backend.model.dao;

import com.gestonino.backend.model.types.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
