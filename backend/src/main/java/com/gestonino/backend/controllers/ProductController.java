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
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> products = productRepository.findAll();
        System.out.println("Prodottelli: ");
        for(Product product : products) {
            System.out.println(product.getName());
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
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

}
