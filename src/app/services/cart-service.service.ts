import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cart = new BehaviorSubject<any[]>([]); 
  cart$ = this.cart.asObservable(); 

  constructor() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart.next(savedCart); 
  }

 
  getCartItems() {
    return this.cart.getValue();
  }


  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart.getValue()));
  }

  
  getTotal(): number {
    return this.cart.getValue().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  
  addToCart(product: any, quantity: number = 1) {
    let currentCart = this.cart.getValue();
    const index = currentCart.findIndex(item => item.id === product.id);

    if (index > -1) {
      currentCart[index].quantity += quantity; 
    } else {
      currentCart.push({ ...product, quantity });
    }

    this.cart.next(currentCart);
    this.saveCart(); 
  }

  
  removeItem(productId: number) {
    let currentCart = this.cart.getValue().filter(item => item.id !== productId);
    this.cart.next(currentCart);
    this.saveCart();
  }

  
  clearCart() {
    this.cart.next([]);
    localStorage.removeItem('cart');
  }

  getCartCount(): number {
    return this.cart.getValue().reduce((total, item) => total + item.quantity, 0);
  }
  
}
