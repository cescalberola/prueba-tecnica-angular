import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass'
})
export class ProductsComponent {
  public  products: Array<ProductInterface> = [];
  
    constructor(private productService: ProductsService) {}
   
    ngOnInit(): void {
      this.getProducts();
    }
  
   getProducts() {
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching characters:', error);
        }
      });
    }
  
}
