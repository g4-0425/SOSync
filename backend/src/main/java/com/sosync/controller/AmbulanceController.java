package com.sosync.controller;

import com.sosync.entity.Ambulance;
import com.sosync.service.AmbulanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ambulances")
public class AmbulanceController {

    private final AmbulanceService ambulanceService;

    @Autowired
    public AmbulanceController(AmbulanceService ambulanceService) {
        this.ambulanceService = ambulanceService;
    }

    @PostMapping
    public ResponseEntity<Ambulance> createAmbulance(@RequestBody Ambulance ambulance) {
        return ResponseEntity.ok(ambulanceService.createAmbulance(ambulance));
    }

    @GetMapping
    public ResponseEntity<List<Ambulance>> getAllAmbulances() {
        return ResponseEntity.ok(ambulanceService.getAllAmbulances());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ambulance> getAmbulance(@PathVariable Long id) {
        Optional<Ambulance> opt = ambulanceService.getAmbulanceById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Ambulance> updateStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            return ResponseEntity.ok(ambulanceService.updateStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
