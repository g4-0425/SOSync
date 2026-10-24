package com.sosync.repository;

import com.sosync.entity.Emergency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyRepository extends JpaRepository<Emergency, Long> {
    // Additional query methods can be added as needed
}
