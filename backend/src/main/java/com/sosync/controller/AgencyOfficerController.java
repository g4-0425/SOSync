package com.sosync.controller;

import com.sosync.entity.AgencyOfficer;
import com.sosync.service.AgencyOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agency")
public class AgencyOfficerController {

    private final AgencyOfficerService agencyOfficerService;

    @Autowired
    public AgencyOfficerController(AgencyOfficerService agencyOfficerService) {
        this.agencyOfficerService = agencyOfficerService;
    }

    @PostMapping
    public ResponseEntity<AgencyOfficer> createOfficer(@RequestBody AgencyOfficer officer) {
        return ResponseEntity.ok(agencyOfficerService.createOfficer(officer));
    }

    @GetMapping
    public ResponseEntity<List<AgencyOfficer>> getAllOfficers() {
        return ResponseEntity.ok(agencyOfficerService.getAllOfficers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgencyOfficer> getOfficer(@PathVariable Long id) {
        Optional<AgencyOfficer> opt = agencyOfficerService.getOfficerById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AgencyOfficer> updateStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            return ResponseEntity.ok(agencyOfficerService.updateStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
