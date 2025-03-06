import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  standalone: false
})
export class ShoppingCartPage implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartServiceService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalAmount();
  }

  updateItemQuantity(item: any, change: number) {
    item.quantity = Math.max(1, item.quantity + change);
    this.cartService.saveCart();
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeCartItem(productId: number) {
    this.cartService.removeItem(productId);
    this.loadCartItems();
    this.displayToast('El producto ha sido eliminado del carrito');
  }

  async displayToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  async proceedToCheckout() {
    if (this.cartItems.length === 0) {
      const toast = await this.toastController.create({
        message: 'El carrito está vacío. No se puede proceder al pago.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}