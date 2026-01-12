import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:5000/api/cart';

  pizzas: any[] = [];
  ingredients: any[] = [];
  grandTotal = 0;

  constructor(private http: HttpClient) {}

  /* ---------- LOCAL CALCULATIONS ---------- */

  calculateTotals() {
    const pizzaTotal = this.pizzas.reduce((sum, p) => sum + p.total, 0);
    const ingredientTotal = this.ingredients.reduce((sum, i) => sum + i.price, 0);
    this.grandTotal = pizzaTotal + ingredientTotal;
  }

  /* ---------- PIZZA OPS ---------- */

  addPizza(pizza: any) {
    const existing = this.pizzas.find(p => p.id === pizza.id);

    if (existing) {
      existing.qty++;
      existing.total = existing.qty * existing.price;
    } else {
      this.pizzas.push({
        id: pizza.id,
        name: pizza.name,
        type: pizza.type,
        price: pizza.price,
        qty: 1,
        total: pizza.price,
        image: pizza.image
      });
    }

    this.calculateTotals();
    this.saveCart();
  }

  increaseQty(pizza: any) {
    pizza.qty++;
    pizza.total = pizza.qty * pizza.price;
    this.calculateTotals();
    this.saveCart();
  }

  decreaseQty(pizza: any) {
    if (pizza.qty > 1) {
      pizza.qty--;
      pizza.total = pizza.qty * pizza.price;
      this.calculateTotals();
      this.saveCart();
    }
  }

  removePizza(id: string) {
    this.pizzas = this.pizzas.filter(p => p.id !== id);
    this.calculateTotals();
    this.saveCart();
  }

  /* ---------- INGREDIENT OPS ---------- */

  setIngredients(ings: any[]) {
    this.ingredients = ings;
    this.calculateTotals();
    this.saveCart();
  }

  /* ---------- BACKEND CALLS ---------- */

  saveCart() {
    const payload = {
      pizzas: this.pizzas,
      ingredients: this.ingredients,
      grandTotal: this.grandTotal
    };

    this.http.post(this.apiUrl, payload).subscribe();
  }

  loadCart() {
    this.http.get<any>(this.apiUrl).subscribe(cart => {
      if (cart) {
        this.pizzas = cart.pizzas || [];
        this.ingredients = cart.ingredients || [];
        this.grandTotal = cart.grandTotal || 0;
      }
    });
  }
    getPizzaSubTotal(): number {
    return this.pizzas.reduce((sum, p) => sum + p.total, 0);
  }

  getIngredientTotal(): number {
    return this.ingredients.reduce((sum, i) => sum + i.price, 0);
  }

  getGrandTotal(): number {
    return this.getPizzaSubTotal() + this.getIngredientTotal();
  }


  clearCart() {
    this.http.delete(this.apiUrl).subscribe(() => {
      this.pizzas = [];
      this.ingredients = [];
      this.grandTotal = 0;
    });
  }
}
