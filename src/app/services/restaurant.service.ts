import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { IRestauratService } from './irestaurant.service';
import { environment } from 'src/environments/environment';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService implements IRestauratService {
  constructor(private http: HttpClient, private _coreService: CoreService) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http
      .get<Restaurant[]>(environment.apiUrl)
      .pipe(catchError(this._coreService.handleError));
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http
      .post<Restaurant>(environment.apiUrl, restaurant)
      .pipe(catchError(this._coreService.handleError));
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http
      .put<Restaurant>(environment.apiUrl, restaurant)
      .pipe(catchError(this._coreService.handleError));
  }

  deleteRestaurant(id: string): Observable<void> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this._coreService.handleError));
  }
}
