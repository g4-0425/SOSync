package com.sosync.repository;

import com.sosync.entity.Ambulance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmbulanceRepository extends JpaRepository<Ambulance, Long> {
    // Additional query methods can be added
}
