package com.sosync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergencies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emergency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emergencyId;
    private String reporterName;
    private String contactNumber;
    private String emergencyType;
    private String priority; // e.g., HIGH, MEDIUM, LOW
    private String description;
    private String location; // could be address or coordinates
    private String sector; // e.g., North, South
    private String status; // e.g., OPEN, ASSIGNED, RESOLVED
    private LocalDateTime reportedAt;
}
