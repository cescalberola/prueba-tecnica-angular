import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Array<ProductInterface> = [];
  
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
        console.error('Error fetching products:', error);
      }
    });
  }
}
