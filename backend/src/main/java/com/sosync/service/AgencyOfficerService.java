package com.sosync.service;

import com.sosync.entity.AgencyOfficer;
import com.sosync.repository.AgencyOfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgencyOfficerService {
    private final AgencyOfficerRepository agencyOfficerRepository;

    @Autowired
    public AgencyOfficerService(AgencyOfficerRepository agencyOfficerRepository) {
        this.agencyOfficerRepository = agencyOfficerRepository;
    }

    public AgencyOfficer createOfficer(AgencyOfficer officer) {
        return agencyOfficerRepository.save(officer);
    }

    public List<AgencyOfficer> getAllOfficers() {
        return agencyOfficerRepository.findAll();
    }

    public Optional<AgencyOfficer> getOfficerById(Long id) {
        return agencyOfficerRepository.findById(id);
    }

    public AgencyOfficer updateStatus(Long id, String status) {
        return agencyOfficerRepository.findById(id)
                .map(o -> {
                    o.setStatus(status);
                    return agencyOfficerRepository.save(o);
                })
                .orElseThrow(() -> new RuntimeException("Officer not found"));
    }
}
