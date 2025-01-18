package com.gestonino.backend.controllers;
import com.gestonino.backend.model.dao.ProductRepository;
import com.gestonino.backend.model.services.ProductService;
import com.gestonino.backend.model.types.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Product>> getAllProduct(@RequestParam String activity_id) {
        System.out.println("Sono qua"+activity_id);
        List<Product> products = productRepository.findByActivityId(Long.valueOf(activity_id));
        System.out.println("Prodottelli: ");
        for(Product product : products) {
            System.out.println(product.getName());
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PutMapping("/editProduct")
    public ResponseEntity<Void> updateProductByCodeAndActivity(
            @RequestParam String code,
            @RequestParam Long activityId,
            @RequestBody Product productDetails) {

        System.out.println("Richiesta di aggiornamento per il prodotto con code: " + code + " e activityId: " + activityId);

        productRepository.updateProductByCodeAndActivityId(
                code,
                String.valueOf(activityId),
                productDetails.getName(),
                productDetails.getQuantity(),
                productDetails.getPrice(),
                productDetails.getDiscount()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/searchProducts")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng,
            @RequestParam(required = false) Double radius,
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        List<Product> products = productService.searchProducts(query, lat, lng, radius, categories, minPrice, maxPrice);
        System.out.println("Prodottelli: " + products);
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

}
