package com.gestonino.backend.model.types;

public class ProductResponse {
    private String name;
    private double price;
    private String activityId;
    private String activityName;
    private Double activityLat;
    private Double activityLng;

    // Costruttore
    public ProductResponse(String name, double price, String activityId, String activityName, Double activityLat, Double activityLng) {
        this.name = name;
        this.price = price;
        this.activityId = activityId;
        this.activityName = activityName;
        this.activityLat = activityLat;
        this.activityLng = activityLng;
    }

    // Getters e Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getActivityId() {
        return activityId;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public Double getActivityLat() {
        return activityLat;
    }

    public void setActivityLat(Double activityLat) {
        this.activityLat = activityLat;
    }

    public Double getActivityLng() {
        return activityLng;
    }

    public void setActivityLng(Double activityLng) {
        this.activityLng = activityLng;
    }
}