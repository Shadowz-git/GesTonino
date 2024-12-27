package com.gestonino.backend.model.services;


import com.gestonino.backend.model.dao.ActivityDAO;
import com.gestonino.backend.model.types.Activity;

import java.sql.SQLException;
import java.util.List;

public class ActivityService {

    private final ActivityDAO activityDAO;

    public ActivityService() throws SQLException {
        this.activityDAO = new ActivityDAO();
    }

    public List<Activity> findByUserId(Long userId) throws SQLException {
        return activityDAO.findByUserId(userId);
    }

    public void save(Activity activity) throws SQLException {
        activityDAO.save(activity);
    }

    public void delete(Long id) throws SQLException {
        activityDAO.delete(id);
    }
}
