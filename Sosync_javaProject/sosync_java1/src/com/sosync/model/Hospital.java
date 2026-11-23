package com.sosync.model;

/**
 * Hospital entity – demonstrates OOP, composition and basic getters/setters.
 */
public class Hospital {
    private int id;
    private String name;
    private String location;
    private int capacity; // number of emergency patients it can handle
    private String facilities; // e.g., "ICU, Trauma, Cardiology"

    public Hospital() {
        this.capacity = 0;
    }

    public Hospital(int id, String name, String location, int capacity, String facilities) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.facilities = facilities;
    }

    public Hospital(String name, String location, int capacity, String facilities) {
        this(0, name, location, capacity, facilities);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public String getFacilities() { return facilities; }
    public void setFacilities(String facilities) { this.facilities = facilities; }

    @Override
    public String toString() {
        return "Hospital{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", capacity=" + capacity +
                ", facilities='" + facilities + '\'' +
                '}';
    }
}
