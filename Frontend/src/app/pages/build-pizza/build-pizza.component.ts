import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls:['./build-pizza.component.css']
})
export class BuildPizzaComponent implements OnInit {

  ingredients: any[] = [];
  selected: any[] = [];
  total = 0;

  constructor(
    private ingService: IngredientService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ingService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });
  }

  toggleIngredient(ing: any, e: any) {
    if (e.target.checked) {
      this.selected.push(ing);
      this.total += ing.price;
    } else {
      this.selected = this.selected.filter(i => i.id !== ing.id);
      this.total -= ing.price;
    }
  }

  buildPizza() {
    this.cartService.setIngredients(this.selected);
    this.router.navigate(['/cart']);
  }
}
