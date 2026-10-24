package com.sosync.service;

import com.sosync.entity.Emergency;
import com.sosync.repository.EmergencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmergencyService {

    private final EmergencyRepository emergencyRepository;

    @Autowired
    public EmergencyService(EmergencyRepository emergencyRepository) {
        this.emergencyRepository = emergencyRepository;
    }

    public Emergency createEmergency(Emergency emergency) {
        return emergencyRepository.save(emergency);
    }

    public List<Emergency> getAllEmergencies() {
        return emergencyRepository.findAll();
    }

    public Optional<Emergency> getEmergencyById(Long id) {
        return emergencyRepository.findById(id);
    }

    public Emergency updateStatus(Long id, String status) {
        Optional<Emergency> opt = emergencyRepository.findById(id);
        if (opt.isPresent()) {
            Emergency e = opt.get();
            e.setStatus(status);
            return emergencyRepository.save(e);
        }
        throw new RuntimeException("Emergency not found");
    }
}
