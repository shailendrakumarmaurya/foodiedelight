import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { RestaurantFormComponent } from 'src/app/components/restaurant-form/restaurant-form.component';
import { CoreService } from 'src/app/core/core.service';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestauratServiceFactory } from 'src/app/services/restaurant-service.factory';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss'],
})
export class ListRestaurantsComponent {
  displayedColumns: string[] = [
    'srno',
    'name',
    'address',
    'description',
    'cuisine',
    'actions',
  ];
  dataSource!: MatTableDataSource<Restaurant>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _restaurantServiceFactory: RestauratServiceFactory,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRestaurant() {
    const dialogRef = this._dialog.open(RestaurantFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const restaurant: Restaurant = {
          id: uuid(),
          name: result.name,
          address: result.address,
          description: result.description,
          cuisine: result.cuisine,
        };
        this._restaurantServiceFactory
          .getService()
          .addRestaurant(restaurant)
          .subscribe({
            next: (val: any) => {
              this.loadRestaurants();
              this._coreService.openSnackBar('Restaurant Added.');
            },
            error: (err: any) => {
              this._coreService.openSnackBar('Add Restaurant Failed.');
            },
          });
      }
    });
  }

  editRestaurant(restaurant: Restaurant) {
    const dialogRef = this._dialog.open(RestaurantFormComponent, {
      width: '600px',
      data: { restaurant: restaurant },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const restaurant: Restaurant = {
          id: result.id,
          name: result.name,
          address: result.address,
          description: result.description,
          cuisine: result.cuisine,
        };
        this._restaurantServiceFactory
          .getService()
          .updateRestaurant(restaurant)
          .subscribe({
            next: (val: any) => {
              this.loadRestaurants();
              this._coreService.openSnackBar('Restaurant Updated.');
            },
            error: (err: any) => {
              this._coreService.openSnackBar('Update Restaurant Failed.');
            },
          });
      }
    });
  }
  deleteRestaurant(id: string): void {
    this._restaurantServiceFactory
      .getService()
      .deleteRestaurant(id)
      .subscribe({
        complete: () => {
          this.loadRestaurants();
          this._coreService.openSnackBar('Restaurant Deleted.');
        },
        error: (err: any) => {
          this._coreService.openSnackBar('Delete Restaurant Failed.');
        },
      });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this._restaurantServiceFactory
      .getService()
      .getRestaurants()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
}
