import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { Restaurant } from './models/restaurant.model';
import { RestauratServiceFactory } from './services/restaurant-service.factory';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FOODIEDELIGHT';

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _restaurantServiceFactory: RestauratServiceFactory
  ) {}
}
