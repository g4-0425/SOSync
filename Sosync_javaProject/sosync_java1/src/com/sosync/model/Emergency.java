package com.sosync.model;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Emergency entity representing a reported incident.
 * Demonstrates OOP concepts: encapsulation, constructors, this keyword,
 * static members, method overriding, Comparable for priority sorting,
 * and composition (has a LocalDateTime).
 */
public class Emergency implements Comparable<Emergency> {
    private int id;
    private String type;
    private String description;
    private int priority; // lower number = higher priority
    private String status;
    private String location;
    private LocalDateTime reportedAt;

    // No‑arg constructor (required for some frameworks)
    public Emergency() {
        this.reportedAt = LocalDateTime.now();
    }

    // Full‑argument constructor
    public Emergency(int id, String type, String description, int priority, String status, String location, LocalDateTime reportedAt) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.location = location;
        this.reportedAt = reportedAt != null ? reportedAt : LocalDateTime.now();
    }

    // Overloaded constructor without id (used before persisting)
    public Emergency(String type, String description, int priority, String status, String location) {
        this(0, type, description, priority, status, location, LocalDateTime.now());
    }

    // Getters & Setters (encapsulation)
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getPriority() { return priority; }
    public void setPriority(int priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public LocalDateTime getReportedAt() { return reportedAt; }
    public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }

    // Comparable – higher priority (smaller number) comes first
    @Override
    public int compareTo(Emergency o) {
        return Integer.compare(this.priority, o.priority);
    }

    @Override
    public String toString() {
        return "Emergency{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", priority=" + priority +
                ", status='" + status + '\'' +
                ", location='" + location + '\'' +
                ", reportedAt=" + reportedAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Emergency)) return false;
        Emergency that = (Emergency) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
