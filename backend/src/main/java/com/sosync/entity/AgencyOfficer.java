package com.sosync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "agency_officers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgencyOfficer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long officerId;
    private String name;
    private String unitId; // e.g., POL-17, FS-23
    private String phone;
    private String agency; // POLICE, FIRE, etc.
    private String status; // AVAILABLE, ASSIGNED, ON_DUTY
}
