import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls:['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cart: CartService,public router:Router) {}

  ngOnInit() {
  this.cart.loadCart();
}

 

  showSuccess = false;

payNow() {
  // Logic to process payment
  this.showSuccess = true;
  this.cart.clearCart();
}

closeSuccess() {
  this.showSuccess = false;
  this.router.navigate(['/']); // Redirect to home page
}
}
