package com.sosync.util;

import com.sosync.model.Emergency;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Simple CSV helper for Emergency records.
 * Demonstrates file I/O, try‑with‑resources, autoboxing and exception handling.
 */
public class CSVUtil {
    private static final String HEADER = "id,type,description,priority,status,location,reportedAt";
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /** Export a list of emergencies to a CSV file. */
    public static void exportEmergencies(List<Emergency> list, String filePath) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath))) {
            bw.write(HEADER);
            bw.newLine();
            for (Emergency e : list) {
                String line = String.format("%d,%s,%s,%d,%s,%s,%s",
                        e.getId(),
                        escape(e.getType()),
                        escape(e.getDescription()),
                        e.getPriority(),
                        escape(e.getStatus()),
                        escape(e.getLocation()),
                        e.getReportedAt().format(FORMATTER));
                bw.write(line);
                bw.newLine();
            }
        }
    }

    /** Import emergencies from a CSV file (ignores the header). */
    public static List<Emergency> importEmergencies(String filePath) throws IOException {
        List<Emergency> list = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line = br.readLine(); // skip header
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",", -1);
                if (parts.length < 7) continue; // malformed line
                Emergency e = new Emergency();
                e.setId(Integer.parseInt(parts[0]));
                e.setType(unescape(parts[1]));
                e.setDescription(unescape(parts[2]));
                e.setPriority(Integer.parseInt(parts[3]));
                e.setStatus(unescape(parts[4]));
                e.setLocation(unescape(parts[5]));
                e.setReportedAt(LocalDateTime.parse(parts[6], FORMATTER));
                list.add(e);
            }
        }
        return list;
    }

    // Escape commas in text fields by wrapping with double quotes and escaping inner quotes.
    private static String escape(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"")) {
            return "\"" + value.replace("\"", "\\\"") + "\"";
        }
        return value;
    }

    private static String unescape(String value) {
        if (value == null) return "";
        value = value.trim();
        if (value.startsWith("\"") && value.endsWith("\"")) {
            value = value.substring(1, value.length() - 1).replace("\\\"", "\"");
        }
        return value;
    }
}
