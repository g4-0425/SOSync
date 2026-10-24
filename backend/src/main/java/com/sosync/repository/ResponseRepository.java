package com.sosync.repository;

import com.sosync.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {
    // Additional query methods can be added as needed
}
