package com.gestonino.backend.controllers;
import com.gestonino.backend.model.dao.ProductRepository;
import com.gestonino.backend.model.services.ProductService;
import com.gestonino.backend.model.types.Product;
import com.gestonino.backend.model.types.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    // TODO: Spostare nella route /api/gestionale cosi la proteggiamo con richieste protette
    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        System.out.println("Sono qua"+product);
        Product savedProduct = productRepository.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Map<String, Object>>> getAllProduct(@RequestParam String activity_id) {
        System.out.println("Sono qua, activity_id: " + activity_id);

        // Trova i prodotti per activity_id
        List<Product> products = productRepository.findByActivityId(Long.valueOf(activity_id));

        // Crea una lista di mappe per la risposta JSON
        List<Map<String, Object>> response = new ArrayList<>();

        for (Product product : products) {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("code", product.getCode());
            productMap.put("name", product.getName());
            productMap.put("category", product.getCategory().getName());
            productMap.put("quantity", product.getQuantity());
            productMap.put("price", product.getPrice());
            productMap.put("discount", product.getDiscount());
            response.add(productMap);
        }

        // Restituisci la risposta
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/editProduct")
    public ResponseEntity<Void> updateProductByCodeAndActivity(
            @RequestParam String code,
            @RequestParam Long activityId,
            @RequestBody Product productDetails) {

        System.out.println("Richiesta di aggiornamento per il prodotto con code: " + code + " e activityId: " + activityId + "Category: "+productDetails.getCategory().getId());

        productRepository.updateProductByCodeAndActivityId(
                code,
                String.valueOf(activityId),
                productDetails.getName(),
                productDetails.getQuantity(),
                productDetails.getPrice(),
                productDetails.getDiscount(),
                String.valueOf(productDetails.getCategory().getId())
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/searchProducts")
    public ResponseEntity<List<ProductResponse>> searchProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng,
            @RequestParam(required = false) Double radius,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<ProductResponse> products = productService.searchProducts(query, lat, lng, radius, minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/deleteProducts")
    public ResponseEntity<Void> deleteProductsByCodesAndActivityId(
            @RequestParam List<String> codes,
            @RequestParam Long activityId) {

        System.out.println("Richiesta di eliminazione per i prodotti con codes: " + codes + " e activityId: " + activityId);

        if (codes == null || codes.isEmpty() || activityId == null) {
            System.err.println("Errore: codes o activityId non sono validi");
            return ResponseEntity.badRequest().build();
        }

        productRepository.deleteByCodesAndActivityId(codes, activityId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getProductCounts")
    public ResponseEntity<Map<String, Long>> getProductCounts(@RequestParam Long activity_id) {
        // Conteggio prodotti con quantità < 5 per l'activity_id specificato
        long lowStockCount = productRepository.countByActivityIdAndQuantityGreaterThanEqualAndQuantityLessThan(activity_id, 1, 5);

        // Conteggio prodotti con quantità = 0 per l'activity_id specificato
        long outOfStockCount = productRepository.countByActivityIdAndQuantity(activity_id, 0);

        // Crea una mappa per la risposta JSON
        Map<String, Long> counts = new HashMap<>();
        counts.put("lowStockCount", lowStockCount);
        counts.put("outOfStockCount", outOfStockCount);

        return new ResponseEntity<>(counts, HttpStatus.OK);
    }

    @GetMapping("/getTotalProdAndTotalPrice")
    public ResponseEntity<Map<String, Long>> getTotalProdAndTotalPrice(@RequestParam Long activity_id) {
        System.out.println("getTatoalProd"+ activity_id);
        long totalProd = productRepository.sumQuantityByIdActivity(activity_id);
        long totalPrice= productRepository.sumTotalByIdActivity(activity_id);
        Map<String, Long> counts = new HashMap<>();
        counts.put("totalProd", totalProd);
        counts.put("totalPrice", totalPrice);
        return new ResponseEntity<>(counts, HttpStatus.OK);
    }

}
