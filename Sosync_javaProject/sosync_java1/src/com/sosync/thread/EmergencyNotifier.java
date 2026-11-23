package com.sosync.thread;

/**
 * Simple Runnable that pretends to notify when a response unit is assigned.
 * Demonstrates Thread creation, naming, sleep, interruption and join.
 */
public class EmergencyNotifier implements Runnable {
    private final int emergencyId;
    private final int unitId;

    public EmergencyNotifier(int emergencyId, int unitId) {
        this.emergencyId = emergencyId;
        this.unitId = unitId;
    }

    @Override
    public void run() {
        try {
            System.out.println("Notifier started for Emergency " + emergencyId + " -> Unit " + unitId);
            // Simulate some processing delay (2 seconds)
            Thread.sleep(2000);
            System.out.println("Unit " + unitId + " is now handling Emergency " + emergencyId + ".");
        } catch (InterruptedException e) {
            System.out.println("Notifier thread interrupted for Emergency " + emergencyId);
            Thread.currentThread().interrupt(); // preserve interrupt status
        }
    }
}
