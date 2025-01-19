package com.gestonino.backend.model.dao;

import com.gestonino.backend.model.types.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}
