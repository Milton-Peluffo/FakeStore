import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePageModule } from './pages/home/home.module';
import { ProductDetailsPageModule } from './pages/product-details/product-details.module';
import { OrderSummaryPageModule } from './pages/order-summary/order-summary.module';
import { PaymentPageModule } from './pages/payment/payment.module';
import { ShoppingCartPageModule } from './pages/shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    ProductDetailsPageModule,
    ShoppingCartPageModule,
    PaymentPageModule,
    OrderSummaryPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
