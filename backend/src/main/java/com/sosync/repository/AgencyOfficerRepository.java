package com.sosync.repository;

import com.sosync.entity.AgencyOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgencyOfficerRepository extends JpaRepository<AgencyOfficer, Long> {
    // Additional query methods can be added, e.g., findByAgencyAndStatus
}
