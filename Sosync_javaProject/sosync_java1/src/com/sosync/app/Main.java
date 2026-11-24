package com.sosync.app;

import com.sosync.dao.EmergencyDAO;
import com.sosync.dao.ResponseUnitDAO;
import com.sosync.dao.HospitalDAO;
import com.sosync.exception.EmergencyNotFoundException;
import com.sosync.model.Emergency;
import com.sosync.model.ResponseUnit;
import com.sosync.model.Hospital;
import com.sosync.util.CSVUtil;
import com.sosync.thread.EmergencyNotifier;

import com.sosync.util.ConsoleUtil;
import java.time.format.DateTimeFormatter;


import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Entry point for the SOSync console application.
 * Demonstrates menu‑driven interaction, DAO usage, collections, streams,
 * generics, file handling, and a tiny multithreading example.
 */
public class Main {
    private static final Scanner SCANNER = new Scanner(System.in);
    private static final EmergencyDAO emergencyDAO = new EmergencyDAO();
    private static final ResponseUnitDAO unitDAO = new ResponseUnitDAO();
    private static final HospitalDAO hospitalDAO = new HospitalDAO();

    // Simple map to remember which unit is assigned to which emergency (demo only)
    private static final Map<Integer, Integer> assignmentMap = new HashMap<>(); // emergencyId -> unitId

    public static void main(String[] args) {

        showWelcomeScreen();
        while (true) {
            displayDashboard();
            printMenu();
            int choice = readInt("Enter choice: ");
            try {
                if (!handleChoice(choice)) break;
            } catch (Exception e) {
                System.err.println("Error: " + e.getMessage());
                e.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
    }

    private static void showWelcomeScreen() {
        ConsoleUtil.clearScreen();
        // Simple ASCII art logo
        String logo =         
        "========================================\n" +
        "       SOSYNC EMERGENCY RESPONSE         \n" +
        "========================================\n" +
        "       SMART EMERGENCY SYSTEM            \n" +
        "========================================\n";
        ConsoleUtil.printColored(logo, ConsoleUtil.BRIGHT_CYAN);
        ConsoleUtil.printColored("Smart Emergency Response System\n", ConsoleUtil.BRIGHT_GREEN);
        ConsoleUtil.printColored("\n", ConsoleUtil.RESET);
        String dateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        ConsoleUtil.printColored("Current: " + dateTime + "\n", ConsoleUtil.YELLOW);
        ConsoleUtil.printColored("System Status: " + ConsoleUtil.GREEN + "OK" + ConsoleUtil.RESET + "\n", ConsoleUtil.BRIGHT_GREEN);
        System.out.println();
    }

    private static void displayDashboard() {
        try {
            int total = emergencyDAO.getAllEmergencies().size();
            long active = emergencyDAO.getAllEmergencies().stream().filter(e -> "Active".equalsIgnoreCase(e.getStatus())).count();
            long pending = emergencyDAO.getAllEmergencies().stream().filter(e -> "Pending".equalsIgnoreCase(e.getStatus())).count();
            long resolved = emergencyDAO.getAllEmergencies().stream().filter(e -> "Resolved".equalsIgnoreCase(e.getStatus())).count();
            long critical = emergencyDAO.getAllEmergencies().stream().filter(e -> e.getPriority() == 1).count();
            int hospitals = hospitalDAO.getAllHospitals().size();
            int units = unitDAO.getAllUnits().size();
            long availableUnits = unitDAO.getAllUnits().stream().filter(ResponseUnit::isAvailable).count();

            ConsoleUtil.printColored("=== Dashboard ===\n", ConsoleUtil.BRIGHT_BLUE);
            System.out.printf("Total Emergencies   : %d\n", total);
            System.out.printf("Active Emergencies  : %d\n", active);
            System.out.printf("Pending Emergencies : %d\n", pending);
            System.out.printf("Resolved Emergencies: %d\n", resolved);
            System.out.printf("Critical Emergencies: %d\n", critical);
            System.out.printf("Registered Hospitals : %d\n", hospitals);
            System.out.printf("Response Units       : %d (Available: %d)\n", units, availableUnits);
            System.out.println();
        } catch (SQLException ex) {
            System.err.println("Dashboard error: " + ex.getMessage());
        }
    }




    private static void printMenu() {
        ConsoleUtil.printColored("\n+------------------- SOSync Menu -------------------+\n", ConsoleUtil.BRIGHT_YELLOW);
        ConsoleUtil.printColored("1.  Register a new emergency\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("2.  Display all emergencies\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("3.  Search emergency by ID\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("4.  Search emergencies by type\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("5.  Update emergency details\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("6.  Update emergency status\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("7.  Delete an emergency\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("8.  Filter emergencies by priority range\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("9.  Display critical emergencies first (sorted)\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("10. Add a response unit\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("11. List all response units\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("12. Assign a response unit to an emergency\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("13. Update unit availability\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("14. Add a hospital\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("15. List all hospitals\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("16. Search hospitals by name\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("17. Recommend a hospital for an emergency type\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("18. Export emergencies to CSV\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("19. Import emergencies from CSV\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("20. Exit\n", ConsoleUtil.CYAN);
        ConsoleUtil.printColored("+-------------------------------------------------+\n", ConsoleUtil.BRIGHT_YELLOW);
    }

    /** Returns false when the user chooses to exit. */
    private static boolean handleChoice(int choice) throws SQLException, IOException, EmergencyNotFoundException {
        switch (choice) {
            case 1 -> registerEmergency();
            case 2 -> displayAllEmergencies();
            case 3 -> searchById();
            case 4 -> searchByType();
            case 5 -> updateEmergencyDetails();
            case 6 -> updateEmergencyStatus();
            case 7 -> deleteEmergency();
            case 8 -> filterByPriority();
            case 9 -> displayCriticalFirst();
            case 10 -> addResponseUnit();
            case 11 -> listResponseUnits();
            case 12 -> assignUnit();
            case 13 -> updateUnitAvailability();
            case 14 -> addHospital();
            case 15 -> listHospitals();
            case 16 -> searchHospitalsByName();
            case 17 -> recommendHospital();
            case 18 -> exportToCSV();
            case 19 -> importFromCSV();
            case 20 -> { return false; }
            default -> System.out.println("Invalid choice. Please try again.");
        }
        return true;
    }

    // ------------------- Emergency operations -------------------
    private static void registerEmergency() throws SQLException {
        System.out.println("--- Register Emergency ---");
        String type = readLine("Type: ");
        String description = readLine("Description: ");
        int priority = readInt("Priority (1=highest): ");
        String status = readLine("Status: ");
        String location = readLine("Location: ");
        Emergency e = new Emergency(type, description, priority, status, location);
        emergencyDAO.addEmergency(e);
        System.out.println("Emergency registered with ID: " + e.getId());
    }

    private static void displayAllEmergencies() throws SQLException {
        List<Emergency> list = emergencyDAO.getAllEmergencies();
        System.out.println("--- All Emergencies ---");
        printEmergencyList(list);
    }


    private static void searchById() throws SQLException, EmergencyNotFoundException {
        int id = readInt("Enter Emergency ID: ");
        Emergency e = emergencyDAO.getEmergencyById(id);
        System.out.println(e);
    }

    private static void searchByType() throws SQLException {
        String type = readLine("Enter type to search: ");
        List<Emergency> list = emergencyDAO.getEmergenciesByType(type);
        printList(list);
    }

    private static void updateEmergencyDetails() throws SQLException, EmergencyNotFoundException {
        int id = readInt("Enter Emergency ID to update: ");
        Emergency e = emergencyDAO.getEmergencyById(id);
        System.out.println("Current: " + e);
        e.setType(readLine("New type (blank to keep): ", e.getType()));
        e.setDescription(readLine("New description (blank to keep): ", e.getDescription()));
        e.setPriority(readInt("New priority (0 to keep): ", e.getPriority()));
        e.setStatus(readLine("New status (blank to keep): ", e.getStatus()));
        e.setLocation(readLine("New location (blank to keep): ", e.getLocation()));
        emergencyDAO.updateEmergency(e);
        System.out.println("Emergency updated.");
    }

    private static void updateEmergencyStatus() throws SQLException {
        int id = readInt("Enter Emergency ID: ");
        String newStatus = readLine("Enter new status: ");
        if ("Resolved".equalsIgnoreCase(newStatus)) {
            try {
                emergencyDAO.resolveEmergency(id);
                System.out.println("Emergency resolved and related updates committed.");
            } catch (EmergencyNotFoundException e) {
                System.err.println("Error: " + e.getMessage());
            }
        } else {
            emergencyDAO.updateEmergencyStatus(id, newStatus);
            System.out.println("Status updated.");
        }
    }


// private static void updateEmergencyStatus() throws SQLException {
//     int id = readInt("Enter Emergency ID: ");

//     try {
//         emergencyDAO.resolveEmergencyWithFailure(id);
//         System.out.println("Unexpected: Transaction completed.");
//     } catch (EmergencyNotFoundException e) {
//         System.err.println("Error: " + e.getMessage());
//     } catch (SQLException e) {
//         System.out.println("Rollback test: " + e.getMessage());
//     }
// }



    private static void deleteEmergency() throws SQLException {
        int id = readInt("Enter Emergency ID to delete: ");
        emergencyDAO.deleteEmergency(id);
        System.out.println("Deleted.");
    }

    private static void filterByPriority() throws SQLException {
        int min = readInt("Min priority: ");
        int max = readInt("Max priority: ");
        List<Emergency> list = emergencyDAO.getAllEmergencies()
                .stream()
                .filter(e -> e.getPriority() >= min && e.getPriority() <= max)
                .collect(Collectors.toList());
        printList(list);
    }

    private static void displayCriticalFirst() throws SQLException {
        PriorityQueue<Emergency> pq = new PriorityQueue<>();
        pq.addAll(emergencyDAO.getAllEmergencies());
        System.out.println("--- Emergencies ordered by priority (lowest number = highest) ---");
        while (!pq.isEmpty()) {
            System.out.println(pq.poll());
        }
    }

    // ------------------- Response Unit operations -------------------
    private static void addResponseUnit() throws SQLException {
        String name = readLine("Unit name: ");
        String type = readLine("Unit type (Ambulance/FireTruck/Police): ");
        ResponseUnit ru = new ResponseUnit(name, type);
        unitDAO.addResponseUnit(ru);
        System.out.println("Added unit with ID: " + ru.getId());
    }

    private static void listResponseUnits() throws SQLException {
        List<ResponseUnit> list = unitDAO.getAllUnits();
        printList(list);
    }

    private static void assignUnit() throws SQLException {
        int emergencyId = readInt("Emergency ID: ");
        int unitId = readInt("Response Unit ID: ");
        // Simple assignment logic – just store in a map and start a notifier thread.
        assignmentMap.put(emergencyId, unitId);
        Thread notifier = new Thread(new EmergencyNotifier(emergencyId, unitId));
        notifier.setName("Notifier-E" + emergencyId);
        notifier.start();
        System.out.println("Unit " + unitId + " assigned to emergency " + emergencyId + ". Notifier started.");
    }

    private static void updateUnitAvailability() throws SQLException {
        int id = readInt("Unit ID: ");
        ResponseUnit ru = unitDAO.getById(id);
        if (ru == null) { System.out.println("Unit not found."); return; }
        System.out.println("Current availability: " + ru.isAvailable());
        boolean avail = readYesNo("Set to available? (y/n): ");
        ru.setAvailable(avail);
        unitDAO.updateResponseUnit(ru);
        System.out.println("Updated.");
    }

    // ------------------- Hospital operations -------------------
    private static void addHospital() throws SQLException {
        String name = readLine("Hospital name: ");
        String location = readLine("Location: ");
        int capacity = readInt("Capacity: ");
        String facilities = readLine("Facilities (comma separated): ");
        Hospital h = new Hospital(name, location, capacity, facilities);
        hospitalDAO.addHospital(h);
        System.out.println("Hospital added with ID: " + h.getId());
    }

    private static void listHospitals() throws SQLException {
        printList(hospitalDAO.getAllHospitals());
    }

    private static void searchHospitalsByName() throws SQLException {
        String keyword = readLine("Enter name keyword: ");
        printList(hospitalDAO.searchByName(keyword));
    }

    private static void recommendHospital() throws SQLException {
        String emergencyType = readLine("Emergency type (e.g., Cardiac): ");
        // Demo heuristic: choose the hospital with highest capacity that mentions the type in facilities.
        List<Hospital> candidates = hospitalDAO.getAllHospitals()
                .stream()
                .filter(h -> h.getFacilities() != null && h.getFacilities().toLowerCase().contains(emergencyType.toLowerCase()))
                .sorted(Comparator.comparingInt(Hospital::getCapacity).reversed())
                .collect(Collectors.toList());
        if (candidates.isEmpty()) {
            System.out.println("No suitable hospital found.");
        } else {
            System.out.println("Recommended hospital: " + candidates.get(0));
        }
    }

    // ------------------- CSV import / export -------------------
    private static void exportToCSV() throws SQLException, IOException {
        String path = readLine("File path to export (e.g., emergencies.csv): ");
        List<Emergency> list = emergencyDAO.getAllEmergencies();
        CSVUtil.exportEmergencies(list, path);
        System.out.println("Exported " + list.size() + " records.");
    }

    private static void importFromCSV() throws IOException, SQLException {
        String path = readLine("File path to import: ");
        List<Emergency> list = CSVUtil.importEmergencies(path);
        for (Emergency e : list) {
            // IDs from CSV may clash – we let the DB assign a fresh one.
            e.setId(0);
            emergencyDAO.addEmergency(e);
        }
        System.out.println("Imported " + list.size() + " emergencies.");
    }

    // ------------------- Helper utilities -------------------
    private static int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            try {
                return Integer.parseInt(SCANNER.nextLine().trim());
            } catch (NumberFormatException ex) {
                System.out.println("Please enter a valid integer.");
            }
        }
    }

    // Overloaded for default value (press Enter to keep current)
    private static int readInt(String prompt, int current) {
        System.out.print(prompt);
        String line = SCANNER.nextLine().trim();
        if (line.isEmpty()) return current;
        try { return Integer.parseInt(line); } catch (NumberFormatException e) { return current; }
    }

    private static String readLine(String prompt) {
        System.out.print(prompt);
        return SCANNER.nextLine().trim();
    }

    private static String readLine(String prompt, String current) {
        System.out.print(prompt);
        String line = SCANNER.nextLine();
        return line.isBlank() ? current : line.trim();
    }

    private static boolean readYesNo(String prompt) {
        while (true) {
            System.out.print(prompt);
            String ans = SCANNER.nextLine().trim().toLowerCase();
            if (ans.equals("y") || ans.equals("yes")) return true;
            if (ans.equals("n") || ans.equals("no")) return false;
            System.out.println("Please answer y or n.");
        }
    }

    // Generic printer using generics – works for any List<T>
    private static <T> void printList(List<T> list) {
        if (list.isEmpty()) {
            System.out.println("(none)");
            return;
        }
        list.forEach(System.out::println);
    }

    // Specialized printer for emergencies with colour-coded priority
    private static void printEmergencyList(List<Emergency> list) {
        if (list.isEmpty()) {
            System.out.println("(none)");
            return;
        }
        String header = String.format("%-5s | %-15s | %-12s | %-8s | %-10s | %s",
                "ID", "Category", "Location", "Priority", "Status", "Description");
        System.out.println(header);
        System.out.println("-".repeat(header.length()));
        for (Emergency e : list) {
            String colour = ConsoleUtil.colorForEmergency(e.getPriority(), e.getStatus());
            String row = String.format("%-5d | %-15s | %-12s | %-8d | %-10s | %s",
                    e.getId(), e.getType(), e.getLocation(), e.getPriority(), e.getStatus(), e.getDescription());
            ConsoleUtil.printColored(row + "\n", colour);
        }
    }
}
