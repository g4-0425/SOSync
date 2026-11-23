package com.sosync.dao;

import com.sosync.model.Hospital;
import com.sosync.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO for Hospital entity – demonstrates JDBC CRUD.
 */
public class HospitalDAO {
    private static final String INSERT_SQL = "INSERT INTO hospitals (name, location, capacity, facilities) VALUES (?,?,?,?)";
    private static final String SELECT_ALL_SQL = "SELECT * FROM hospitals";
    private static final String SELECT_BY_ID_SQL = "SELECT * FROM hospitals WHERE id = ?";
    private static final String SELECT_BY_NAME_SQL = "SELECT * FROM hospitals WHERE name LIKE ?";
    private static final String UPDATE_SQL = "UPDATE hospitals SET name = ?, location = ?, capacity = ?, facilities = ? WHERE id = ?";
    private static final String DELETE_SQL = "DELETE FROM hospitals WHERE id = ?";

    public void addHospital(Hospital h) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, h.getName());
            ps.setString(2, h.getLocation());
            ps.setInt(3, h.getCapacity());
            ps.setString(4, h.getFacilities());
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    h.setId(rs.getInt(1));
                }
            }
        }
    }

    public List<Hospital> getAllHospitals() throws SQLException {
        List<Hospital> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_ALL_SQL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(mapRow(rs));
            }
        }
        return list;
    }

    public Hospital findById(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_ID_SQL)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
                return null;
            }
        }
    }

    public List<Hospital> searchByName(String keyword) throws SQLException {
        List<Hospital> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_NAME_SQL)) {
            ps.setString(1, "%" + keyword + "%");
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRow(rs));
                }
            }
        }
        return list;
    }

    public void updateHospital(Hospital h) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(UPDATE_SQL)) {
            ps.setString(1, h.getName());
            ps.setString(2, h.getLocation());
            ps.setInt(3, h.getCapacity());
            ps.setString(4, h.getFacilities());
            ps.setInt(5, h.getId());
            ps.executeUpdate();
        }
    }

    public void deleteHospital(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_SQL)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }

    private Hospital mapRow(ResultSet rs) throws SQLException {
        Hospital h = new Hospital();
        h.setId(rs.getInt("id"));
        h.setName(rs.getString("name"));
        h.setLocation(rs.getString("location"));
        h.setCapacity(rs.getInt("capacity"));
        h.setFacilities(rs.getString("facilities"));
        return h;
    }
}
