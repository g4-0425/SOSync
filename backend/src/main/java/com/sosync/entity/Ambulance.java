package com.sosync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ambulances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ambulance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ambulanceId;
    private String driverName;
    private String phone;
    private String vehicleNumber;
    private String status; // AVAILABLE, ASSIGNED, ON_DUTY
    private double latitude;
    private double longitude;
}
