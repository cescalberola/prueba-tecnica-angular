import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ProductsService } from '../../services/products.service';

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

  sortTitle(sort: string | null): void {
    if (sort !== null) {
      this.products = this.sortData(sort, this.products, (item: ProductInterface) => item.title);
    }
  }

  sortCategory(sort: string | null): void {
    if (sort !== null) {
      this.products = this.sortData(sort, this.products, (item: ProductInterface) => item.category);
    }
  }

  sortPrice(sort: string | null): void {
    if (sort !== null) {
      this.products = this.sortData(sort, this.products, (item: ProductInterface) => item.price);
    }
  }

  private sortData(sort: string, data: ProductInterface[], extractKey: (item: ProductInterface) => any): ProductInterface[] {
    const sortOrder: NzTableSortOrder = sort as NzTableSortOrder;
    return [...data.sort((a, b) => {
      const keyA = extractKey(a);
      const keyB = extractKey(b);

      if (sortOrder === 'ascend') {
        return keyA > keyB ? 1 : -1;
      } else if (sortOrder === 'descend') {
        return keyA < keyB ? 1 : -1;
      } else {
        return 0;
      }
    })];
  }
}
