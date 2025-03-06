import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: false
})
export class ProductDetailsPage implements OnInit {
  productDetails: any = {};
  productQuantity: number = 1;
  totalCartItems: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    public cartService: CartServiceService, 
    private toastController: ToastController,
    private location: Location
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId) && productId > 0) {
      this.apiService.getProductById(productId).subscribe(data => {
        this.productDetails = data;
      });
    }

    this.cartService.cart$.subscribe(cart => {
      this.totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  increaseProductQuantity() {
    this.productQuantity++;
  }

  decreaseProductQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  addProductToCart() {
    this.cartService.addToCart(this.productDetails, this.productQuantity);
    this.displayToast('Producto añadido al carrito');
  }

  async displayToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  navigateBack() {
    this.location.back();
  }
}