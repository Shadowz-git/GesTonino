package com.gestonino.backend.model.dao;

import com.gestonino.backend.model.db.DatabaseManager;
import com.gestonino.backend.model.types.Activity;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ActivityDAO {

    private final Connection connection;

    public ActivityDAO() throws SQLException {
        this.connection = DatabaseManager.getInstance().getConnection();
    }

    public List<Activity> findByUserId(Long userId) throws SQLException {
        String query = "SELECT * FROM activities WHERE user_id = ?";
        List<Activity> activities = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                activities.add(mapResultSetToActivity(rs));
            }
        }
        return activities;
    }

    public void save(Activity activity) throws SQLException {
        String query = "INSERT INTO activities (name, address, cap, latitude, longitude, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, activity.getName());
            stmt.setString(2, activity.getAddress());
            stmt.setString(3, activity.getCap());
            stmt.setDouble(4, activity.getLatitude());
            stmt.setDouble(5, activity.getLongitude());
            stmt.setLong(6, activity.getUser().getId());
            stmt.executeUpdate();
        }
    }

    public void delete(Long id) throws SQLException {
        String query = "DELETE FROM activities WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    private Activity mapResultSetToActivity(ResultSet rs) throws SQLException {
        Activity activity = new Activity();
        activity.setId(rs.getLong("id"));
        activity.setName(rs.getString("name"));
        activity.setAddress(rs.getString("address"));
        activity.setCap(rs.getString("cap"));
        activity.setLatitude(rs.getDouble("latitude"));
        activity.setLongitude(rs.getDouble("longitude"));
        return activity;
    }
}
