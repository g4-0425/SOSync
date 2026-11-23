package com.sosync.dao;

import com.sosync.model.ResponseUnit;
import com.sosync.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO for ResponseUnit entity – demonstrates JDBC CRUD and mapping.
 */
public class ResponseUnitDAO {
    private static final String INSERT_SQL = "INSERT INTO response_units (name, type, available) VALUES (?,?,?)";
    private static final String SELECT_ALL_SQL = "SELECT * FROM response_units";
    private static final String SELECT_BY_ID_SQL = "SELECT * FROM response_units WHERE id = ?";
    private static final String UPDATE_SQL = "UPDATE response_units SET name = ?, type = ?, available = ? WHERE id = ?";
    private static final String DELETE_SQL = "DELETE FROM response_units WHERE id = ?";

    public void addResponseUnit(ResponseUnit ru) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, ru.getName());
            ps.setString(2, ru.getType());
            ps.setBoolean(3, ru.isAvailable());
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    ru.setId(rs.getInt(1));
                }
            }
        }
    }

    public List<ResponseUnit> getAllUnits() throws SQLException {
        List<ResponseUnit> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_ALL_SQL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                ResponseUnit ru = mapRow(rs);
                list.add(ru);
            }
        }
        return list;
    }

    public ResponseUnit getById(int id) throws SQLException {
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

    public void updateResponseUnit(ResponseUnit ru) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(UPDATE_SQL)) {
            ps.setString(1, ru.getName());
            ps.setString(2, ru.getType());
            ps.setBoolean(3, ru.isAvailable());
            ps.setInt(4, ru.getId());
            ps.executeUpdate();
        }
    }

    public void deleteResponseUnit(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_SQL)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }

    private ResponseUnit mapRow(ResultSet rs) throws SQLException {
        ResponseUnit ru = new ResponseUnit();
        ru.setId(rs.getInt("id"));
        ru.setName(rs.getString("name"));
        ru.setType(rs.getString("type"));
        ru.setAvailable(rs.getBoolean("available"));
        return ru;
    }
}
