import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartServiceService } from 'src/app/services/cart-service.service';

interface Customer {
  name: string;
  email: string;
  address: string;
}

interface PurchasedItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  standalone: false
})
export class OrderSummaryPage implements OnInit {
  customer: Customer = { name: '', email: '', address: '' };
  purchasedItems: PurchasedItem[] = [];
  total: number = 0;

  constructor(
    private router: Router, 
    private cartService: CartServiceService,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.customer = navigation.extras.state['customer'] as Customer;
      this.purchasedItems = navigation.extras.state['purchasedItems'] as PurchasedItem[];
      this.total = navigation.extras.state['total'] as number || 
                   this.purchasedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      this.showPaymentSuccessToast(); 
    } else {
      this.router.navigate(['/home']); 
    }
  }

  async showPaymentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'El pago se ha realizado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  goToHome() {
    this.cartService.clearCart(); 
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
