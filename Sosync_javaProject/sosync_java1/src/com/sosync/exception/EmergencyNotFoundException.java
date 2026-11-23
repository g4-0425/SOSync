package com.sosync.exception;

/**
 * Checked exception thrown when an emergency record cannot be found.
 */
public class EmergencyNotFoundException extends Exception {
    public EmergencyNotFoundException(String message) {
        super(message);
    }
}
