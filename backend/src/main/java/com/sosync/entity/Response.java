package com.sosync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "responses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long responseId;
    private Long emergencyId;
    private Long responderId; // could be ambulance or officer id
    private String responderType; // AMBULANCE, POLICE, FIRE
    private String status; // DISPATCHED, ENROUTE, ARRIVED, COMPLETED
    private LocalDateTime timestamp;
}
