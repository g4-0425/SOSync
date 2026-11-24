package com.sosync.dao;

import com.sosync.model.Emergency;
import com.sosync.util.DBConnection;
import com.sosync.exception.EmergencyNotFoundException;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object for Emergency entity.
 * Demonstrates JDBC CRUD, try‑with‑resources, PreparedStatement, and mapping.
 */
public class EmergencyDAO {
    private static final String INSERT_SQL = "INSERT INTO emergencies (type, description, priority, status, location, reported_at) VALUES (?,?,?,?,?,?)";
    private static final String SELECT_ALL_SQL = "SELECT * FROM emergencies";
    private static final String SELECT_BY_ID_SQL = "SELECT * FROM emergencies WHERE id = ?";
    private static final String SELECT_BY_TYPE_SQL = "SELECT * FROM emergencies WHERE type = ?";
    private static final String UPDATE_SQL = "UPDATE emergencies SET type = ?, description = ?, priority = ?, status = ?, location = ?, reported_at = ? WHERE id = ?";
    private static final String UPDATE_STATUS_SQL = "UPDATE emergencies SET status = ? WHERE id = ?";
    public void resolveEmergencyWithFailure(int emergencyId) throws SQLException, EmergencyNotFoundException {
        // Same as resolveEmergency but forces a failure to demonstrate rollback
        try (Connection conn = DBConnection.getConnection()) {
            boolean originalAutoCommit = conn.getAutoCommit();
            conn.setAutoCommit(false);
            try {
                // Verify existence and get current status
                String currentStatus;
                try (PreparedStatement ps = conn.prepareStatement("SELECT status FROM emergencies WHERE id = ?")) {
                    ps.setInt(1, emergencyId);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            throw new EmergencyNotFoundException("Emergency with ID " + emergencyId + " not found.");
                        }
                        currentStatus = rs.getString("status");
                        if ("Resolved".equalsIgnoreCase(currentStatus)) {
                            throw new SQLException("Emergency already resolved.");
                        }
                    }
                }
                // Update emergency status to Resolved
                try (PreparedStatement ps = conn.prepareStatement(UPDATE_STATUS_SQL)) {
                    ps.setString(1, "Resolved");
                    ps.setInt(2, emergencyId);
                    ps.executeUpdate();
                }
                // Insert into status_history
                try (PreparedStatement ps = conn.prepareStatement(INSERT_HISTORY_SQL)) {
                    ps.setInt(1, emergencyId);
                    ps.setString(2, currentStatus);
                    ps.setString(3, "Resolved");
                    ps.executeUpdate();
                }
                // Find assigned unit (if any)
                int unitId = -1;
                try (PreparedStatement ps = conn.prepareStatement("SELECT unit_id FROM emergency_assignments WHERE emergency_id = ?")) {
                    ps.setInt(1, emergencyId);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            unitId = rs.getInt("unit_id");
                        }
                    }
                }
                // Update unit availability to true if assigned
                if (unitId != -1) {
                    try (PreparedStatement ps = conn.prepareStatement(UPDATE_UNIT_AVAIL_SQL)) {
                        ps.setBoolean(1, true);
                        ps.setInt(2, unitId);
                        ps.executeUpdate();
                    }
                }
                // Simulated failure
                throw new SQLException("Simulated failure to test rollback");
            } catch (SQLException | EmergencyNotFoundException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(originalAutoCommit);
            }
        }
    }

    public void resolveEmergency(int emergencyId) throws SQLException, EmergencyNotFoundException { // Transaction: update status, insert history, update assigned unit availability
        try (Connection conn = DBConnection.getConnection()) {
            boolean originalAutoCommit = conn.getAutoCommit();
            conn.setAutoCommit(false);
            try {
                // Verify existence and get current status
                String currentStatus;
                try (PreparedStatement ps = conn.prepareStatement("SELECT status FROM emergencies WHERE id = ?")) {
                    ps.setInt(1, emergencyId);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            throw new EmergencyNotFoundException("Emergency with ID " + emergencyId + " not found.");
                        }
                        currentStatus = rs.getString("status");
                        if ("Resolved".equalsIgnoreCase(currentStatus)) {
                            throw new SQLException("Emergency already resolved.");
                        }
                    }
                }
                // Update emergency status to Resolved
                try (PreparedStatement ps = conn.prepareStatement(UPDATE_STATUS_SQL)) {
                    ps.setString(1, "Resolved");
                    ps.setInt(2, emergencyId);
                    ps.executeUpdate();
                }
                // Insert into status_history
                try (PreparedStatement ps = conn.prepareStatement(INSERT_HISTORY_SQL)) {
                    ps.setInt(1, emergencyId);
                    ps.setString(2, currentStatus);
                    ps.setString(3, "Resolved");
                    ps.executeUpdate();
                }
                // Find assigned unit (if any)
                int unitId = -1;
                try (PreparedStatement ps = conn.prepareStatement("SELECT unit_id FROM emergency_assignments WHERE emergency_id = ?")) {
                    ps.setInt(1, emergencyId);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            unitId = rs.getInt("unit_id");
                        }
                    }
                }
                // Update unit availability to true if assigned
                if (unitId != -1) {
                    try (PreparedStatement ps = conn.prepareStatement(UPDATE_UNIT_AVAIL_SQL)) {
                        ps.setBoolean(1, true);
                        ps.setInt(2, unitId);
                        ps.executeUpdate();
                    }
                }
                conn.commit();
            } catch (SQLException | EmergencyNotFoundException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(originalAutoCommit);
            }
        }
    }

    private static final String INSERT_HISTORY_SQL = "INSERT INTO status_history (emergency_id, old_status, new_status) VALUES (?,?,?)";
    private static final String UPDATE_UNIT_AVAIL_SQL = "UPDATE response_units SET available = ? WHERE id = ?";
    private static final String DELETE_SQL = "DELETE FROM emergencies WHERE id = ?";

    public void addEmergency(Emergency e) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, e.getType());
            ps.setString(2, e.getDescription());
            ps.setInt(3, e.getPriority());
            ps.setString(4, e.getStatus());
            ps.setString(5, e.getLocation());
            ps.setTimestamp(6, Timestamp.valueOf(e.getReportedAt()));
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    e.setId(rs.getInt(1));
                }
            }
        }
    }

    public List<Emergency> getAllEmergencies() throws SQLException {
        List<Emergency> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_ALL_SQL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(mapRow(rs));
            }
        }
        return list;
    }

    public Emergency getEmergencyById(int id) throws SQLException, EmergencyNotFoundException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_ID_SQL)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                } else {
                    throw new EmergencyNotFoundException("Emergency with ID " + id + " not found.");
                }
            }
        }
    }

    public List<Emergency> getEmergenciesByType(String type) throws SQLException {
        List<Emergency> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_TYPE_SQL)) {
            ps.setString(1, type);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRow(rs));
                }
            }
        }
        return list;
    }

    public void updateEmergency(Emergency e) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(UPDATE_SQL)) {
            ps.setString(1, e.getType());
            ps.setString(2, e.getDescription());
            ps.setInt(3, e.getPriority());
            ps.setString(4, e.getStatus());
            ps.setString(5, e.getLocation());
            ps.setTimestamp(6, Timestamp.valueOf(e.getReportedAt()));
            ps.setInt(7, e.getId());
            ps.executeUpdate();
        }
    }

    public void updateEmergencyStatus(int id, String newStatus) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(UPDATE_STATUS_SQL)) {
            ps.setString(1, newStatus);
            ps.setInt(2, id);
            ps.executeUpdate();
        }
    }

    public void deleteEmergency(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_SQL)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }

    private Emergency mapRow(ResultSet rs) throws SQLException {
        Emergency e = new Emergency();
        e.setId(rs.getInt("id"));
        e.setType(rs.getString("type"));
        e.setDescription(rs.getString("description"));
        e.setPriority(rs.getInt("priority"));
        e.setStatus(rs.getString("status"));
        e.setLocation(rs.getString("location"));
        Timestamp ts = rs.getTimestamp("reported_at");
        e.setReportedAt(ts != null ? ts.toLocalDateTime() : LocalDateTime.now());
        return e;
    }
}
