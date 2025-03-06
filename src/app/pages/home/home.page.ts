import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  itemList: any[] = [];
  categoryList: string[] = [];
  currentCategory: string = '';
  searchQuery: string = '';
  totalCartItems: number = 0; 

  constructor(private apiService: ApiServiceService, private router: Router, public cartService: CartServiceService) {}

  ngOnInit() {
    this.apiService.getAllProducts().subscribe(data => {
      this.itemList = data;
    });

    this.apiService.getCategories().subscribe(data => {
      this.categoryList = data;
    });

    this.cartService.cart$.subscribe(cart => {
      this.totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]); 
  }

  searchProducts() {
    this.apiService.getAllProducts().subscribe(data => {
      this.itemList = data.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

  handleCategoryChange() {
    if (this.currentCategory === '' || this.currentCategory === null) {  
      this.apiService.getAllProducts().subscribe(data => {
        this.itemList = data;
      });
    } else {
      this.apiService.getProductsByCategory(this.currentCategory).subscribe(data => {
        this.itemList = data;
      });
    }
  }
}