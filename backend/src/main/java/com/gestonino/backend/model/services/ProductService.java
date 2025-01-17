package com.gestonino.backend.model.services;

import com.gestonino.backend.model.dao.ActivityRepository;
import com.gestonino.backend.model.dao.ProductRepository;
import com.gestonino.backend.model.types.Activity;
import com.gestonino.backend.model.types.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> searchProducts(String query, Double lat, Double lng, Double radius,
                                        List<String> categories, Double minPrice, Double maxPrice) {

        // Normalizza il raggio tra 2 km e 200 km
        double adjustedRadius = Math.min(Math.max(radius != null ? radius : 2, 2), 200);

        // Se le coordinate sono nulle, non eseguire ricerche per attività
        List<Long> activityIds = Collections.emptyList();
        if (lat != null && lng != null) {
            // Trova le attività nel raggio
            List<Activity> activities = activityRepository.findActivitiesInRadius(lat, lng, adjustedRadius);
            activityIds = activities.stream()
                    .map(Activity::getId)
                    .collect(Collectors.toList());
        }

        // Se non ci sono attività, ritorna una lista vuota
        if (activityIds.isEmpty()) {
            return Collections.emptyList();
        }

        // Gestisci il prezzo minimo e massimo: ignora se -1 o nullo
        Double validMinPrice = (minPrice != null && minPrice != -1) ? minPrice : null;
        Double validMaxPrice = (maxPrice != null && maxPrice != -1) ? maxPrice : null;

        // Gestisci le categorie: ignora se la lista è vuota o nulla
        List<String> validCategories = (categories != null && !categories.isEmpty()) ? categories : null;

        // Trova i prodotti basati sugli ID delle attività e i filtri forniti
        return productRepository.findProductsByActivityIds(query, validCategories, validMinPrice, validMaxPrice, activityIds);
    }
}
