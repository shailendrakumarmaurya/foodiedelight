import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

export interface IRestauratService {
  getRestaurants(): Observable<Restaurant[]>;
  addRestaurant(restaurant: Restaurant): Observable<Restaurant>;
  updateRestaurant(restaurant: Restaurant): Observable<Restaurant>;
  deleteRestaurant(id: string): Observable<void>;
}
