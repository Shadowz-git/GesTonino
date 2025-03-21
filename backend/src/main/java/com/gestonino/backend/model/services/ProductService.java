package com.gestonino.backend.model.services;

import com.gestonino.backend.model.dao.ActivityRepository;
import com.gestonino.backend.model.dao.ProductRepository;
import com.gestonino.backend.model.types.Activity;
import com.gestonino.backend.model.types.Product;
import com.gestonino.backend.model.types.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<ProductResponse> searchProducts(String query, Double lat, Double lng, Double radius,
                                                Double minPrice, Double maxPrice) {

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

        // Trova i prodotti basati sugli ID delle attività e i filtri forniti
        List<Product> products = productRepository.findProductsByActivityIds(query, validMinPrice, validMaxPrice, activityIds);

        // Mappa i prodotti alla classe ProductResponse
        return products.stream()
                .map(product -> {
                    Activity activity = activityRepository.findById(product.getActivity().getId()).orElse(null);
                    if (activity != null) {
                        return new ProductResponse(
                                product.getName(),
                                product.getPrice(),
                                product.getActivity().getId().toString(),
                                activity.getName(),
                                activity.getLatitude(),
                                activity.getLongitude()
                        );
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
