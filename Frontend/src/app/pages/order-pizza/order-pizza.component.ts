import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent implements OnInit {

  pizzas: any[] = [];

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe((data: any[]) => {
      this.pizzas = data;
    });
  }

  addToCart(pizza: any): void {
    this.cartService.addPizza(pizza);
    pizza.added = true;
  }

  removeFromCart(pizza: any): void {
    this.cartService.removePizza(pizza._id);
    pizza.added = false;
  }
}
