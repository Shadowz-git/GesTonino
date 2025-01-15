package com.gestonino.backend.controllers;

import com.gestonino.backend.model.dao.ActivityRepository;
import com.gestonino.backend.model.types.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
}
