package com.sosync.service;

import com.sosync.entity.Ambulance;
import com.sosync.repository.AmbulanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AmbulanceService {
    private final AmbulanceRepository ambulanceRepository;

    @Autowired
    public AmbulanceService(AmbulanceRepository ambulanceRepository) {
        this.ambulanceRepository = ambulanceRepository;
    }

    public Ambulance createAmbulance(Ambulance ambulance) {
        return ambulanceRepository.save(ambulance);
    }

    public List<Ambulance> getAllAmbulances() {
        return ambulanceRepository.findAll();
    }

    public Optional<Ambulance> getAmbulanceById(Long id) {
        return ambulanceRepository.findById(id);
    }

    public Ambulance updateStatus(Long id, String status) {
        return ambulanceRepository.findById(id)
                .map(a -> {
                    a.setStatus(status);
                    return ambulanceRepository.save(a);
                })
                .orElseThrow(() -> new RuntimeException("Ambulance not found"));
    }
}
