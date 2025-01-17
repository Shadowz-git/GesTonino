package com.gestonino.backend.controllers;

import com.gestonino.backend.model.dao.ActivityRepository;
import com.gestonino.backend.model.types.Activity;
import com.gestonino.backend.model.types.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/createActivity")
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        System.out.println("Qua Activity");
        Activity activitySaved= activityRepository.save(activity);
        return new ResponseEntity<>(activitySaved, HttpStatus.CREATED);
    }
}
