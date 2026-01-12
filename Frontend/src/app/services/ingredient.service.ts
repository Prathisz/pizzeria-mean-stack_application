import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'http://localhost:5000/api/ing';

  constructor(private http: HttpClient) {}

  getIngredients() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
