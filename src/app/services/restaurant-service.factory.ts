import { Injectable } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { MockRestaurantService } from './mock-restaurant.service';
import { IRestauratService } from './irestaurant.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestauratServiceFactory {
  constructor(
    private _service: RestaurantService,
    private _mockService: MockRestaurantService
  ) {}

  getService(): IRestauratService {
    if (environment.mock) {
      return this._mockService;
    }
    return this._service;
  }
}
