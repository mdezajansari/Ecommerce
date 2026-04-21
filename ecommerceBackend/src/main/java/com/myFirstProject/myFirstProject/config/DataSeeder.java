package com.myFirstProject.myFirstProject.config;

import com.myFirstProject.myFirstProject.Repository.ProductRepository;
import com.myFirstProject.myFirstProject.entity.Products;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            System.out.println("Seeding database with sample products...");

            String[] categories = {
                "electronics", "clothes", "furniture", "beauty", 
                "sports", "books", "toys-games", "automotive", 
                "health", "office", "jewelry", "food"
            };

            for (String category : categories) {
                Products p = new Products();
                p.setProduct_name("Sample " + category.substring(0, 1).toUpperCase() + category.substring(1) + " Product");
                p.setProduct_desc("This is a fantastic sample product specifically designed for the " + category + " category.");
                p.setCategory(category);
                p.setProduct_price(199); 
                p.setDiscount(10); 
                p.setImgLink("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop");
                p.setSlug("sample-" + category);
                
                productRepository.save(p);
            }

            System.out.println("Database seeding completed!");
        }
    }
}
