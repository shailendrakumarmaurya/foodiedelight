import { Injectable } from '@angular/core';
import { IRestauratService } from './irestaurant.service';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class MockRestaurantService implements IRestauratService {
  constructor() {}
  restaurants: Restaurant[] = [];
  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    this.restaurants.push(restaurant);
    return of(restaurant);
  }
  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const updatedRestaurant = this.restaurants.map((x) => {
      if (x.id === restaurant.id) {
        return restaurant;
      }
      return x;
    });
    this.restaurants = updatedRestaurant;
    return of(restaurant);
  }
  deleteRestaurant(id: string): Observable<void> {
    this.restaurants = this.restaurants.filter((x) => x.id !== id);
    return of();
  }
}
