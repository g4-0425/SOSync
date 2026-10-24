package com.sosync.controller;

import com.sosync.entity.Emergency;
import com.sosync.service.EmergencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/emergencies")
public class EmergencyController {

    private final EmergencyService emergencyService;

    @Autowired
    public EmergencyController(EmergencyService emergencyService) {
        this.emergencyService = emergencyService;
    }

    @PostMapping
    public ResponseEntity<Emergency> createEmergency(@RequestBody Emergency emergency) {
        Emergency saved = emergencyService.createEmergency(emergency);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Emergency>> getAllEmergencies() {
        return ResponseEntity.ok(emergencyService.getAllEmergencies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emergency> getEmergency(@PathVariable Long id) {
        Optional<Emergency> opt = emergencyService.getEmergencyById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Emergency> updateStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            Emergency updated = emergencyService.updateStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
