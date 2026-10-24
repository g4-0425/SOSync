package com.sosync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospitalId;
    private String name;
    private String type; // e.g., General, Trauma, Specialty
    private String address;
    private String phone;
    private int icuBeds;
    private int totalBeds;
    private int occupancy; // percentage 0-100
    private String status; // e.g., OPEN, CLOSED
    private double latitude;
    private double longitude;
}
