package com.sosync.repository;

import com.sosync.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    // Additional queries can be added, e.g., findByStatus
}
