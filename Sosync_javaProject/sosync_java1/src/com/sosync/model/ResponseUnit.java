package com.sosync.model;

/**
 * Represents a response unit (e.g., ambulance, fire‑truck, police car).
 * Demonstrates encapsulation, constructor overloading and HAS‑A relationship.
 */
public class ResponseUnit {
    private int id;
    private String name;
    private String type; // e.g., Ambulance, FireTruck, PoliceCar
    private boolean available;

    public ResponseUnit() {
        this.available = true;
    }

    public ResponseUnit(int id, String name, String type, boolean available) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.available = available;
    }

    public ResponseUnit(String name, String type) {
        this(0, name, type, true);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    @Override
    public String toString() {
        return "ResponseUnit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", available=" + available +
                '}';
    }
}
