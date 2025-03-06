import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ToastController, LoadingController } from '@ionic/angular';

interface Customer {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage {
  customer: Customer = { name: '', email: '', address: '', cardNumber: '', expiration: '', cvv: '' };
  purchasedItems: any[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    public cartService: CartServiceService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.purchasedItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  async processPayment() {
    if (!this.customer.name || !this.customer.email || !this.customer.address) {
      this.showToast('Por favor, completa todos los datos.');
      return;
    }

    if (!/^\d{16}$/.test(this.customer.cardNumber)) {
      this.showToast('El número de tarjeta debe tener 16 dígitos numéricos.');
      return;
    }
  
    if (!/^\d{3,4}$/.test(this.customer.cvv)) {
      this.showToast('El CVV debe tener 3 o 4 dígitos numéricos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Procesando pago...',
      duration: 3000,
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/summary'], {
        state: {
          customer: this.customer,
          purchasedItems: this.purchasedItems,
          total: this.total,
        },
      });
    }, 3000);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }
}
