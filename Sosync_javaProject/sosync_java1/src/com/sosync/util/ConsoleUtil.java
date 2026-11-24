package com.sosync.util;

/**
 * Utility class for console output with ANSI colors and simple helpers.
 * Works on Windows PowerShell and most terminals that support ANSI escape codes.
 */
public class ConsoleUtil {
    // ANSI escape codes
    public static final String RESET = "\u001B[0m";
    public static final String BLACK = "\u001B[30m";
    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String YELLOW = "\u001B[33m";
    public static final String BLUE = "\u001B[34m";
    public static final String PURPLE = "\u001B[35m";
    public static final String CYAN = "\u001B[36m";
    public static final String WHITE = "\u001B[37m";

    public static final String BRIGHT_BLACK = "\u001B[90m";
    public static final String BRIGHT_RED = "\u001B[91m";
    public static final String BRIGHT_GREEN = "\u001B[92m";
    public static final String BRIGHT_YELLOW = "\u001B[93m";
    public static final String BRIGHT_BLUE = "\u001B[94m";
    public static final String BRIGHT_PURPLE = "\u001B[95m";
    public static final String BRIGHT_CYAN = "\u001B[96m";
    public static final String BRIGHT_WHITE = "\u001B[97m";

    /** Clears the console screen. */
    public static void clearScreen() {
        // ANSI clear screen + move cursor to home
        System.out.print("\u001B[2J\u001B[H");
        System.out.flush();
    }

    /** Prints text in the given ANSI colour. */
    public static void printColored(String text, String ansiColor) {
        System.out.print(ansiColor + text + RESET);
    }

    /** Returns an ANSI colour based on emergency priority. */
    public static String colorForEmergency(int priority, String status) {
        // Resolved status overrides priority colour
        if ("Resolved".equalsIgnoreCase(status)) {
            return BRIGHT_GREEN; // neutral/green for resolved
        }
        // Determine colour based on priority when not resolved
        switch (priority) {
            case 1:
                return BRIGHT_RED; // Critical
            case 2:
                return YELLOW; // High (using yellow as orange approximation)
            case 3:
                return BLUE; // Medium
            case 4:
                return BRIGHT_BLACK; // Low (grey approximation)
            default:
                return WHITE;
        }
    }

}
