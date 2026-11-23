package com.sosync.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    // Load the MySQL driver once when the class is loaded.
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found. Ensure mysql‑connector‑java JAR is in the lib folder.");
            e.printStackTrace();
        }
    }


    private static final String URL =
        "jdbc:mysql://localhost:3306/sosync_java";

    private static final String USER = "root";

   private static final String PASSWORD =
        System.getenv("SOSYNC_DB_PASSWORD");

    public static Connection getConnection() throws SQLException {

        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
