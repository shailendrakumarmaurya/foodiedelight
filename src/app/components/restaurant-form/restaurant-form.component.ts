import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../models/restaurant.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  private _restaurantForm: FormGroup | undefined;

  get restaurantForm(): FormGroup {
    if (this._restaurantForm === undefined) {
      this._restaurantForm = this.fb.group({
        name: [this.data?.restaurant?.name || '', Validators.required],
        address: [this.data?.restaurant?.address || '', Validators.required],
        cuisine: [this.data?.restaurant?.cuisine || '', Validators.required],
        description: [
          this.data?.restaurant?.description || '',
          Validators.required,
        ],
      });
    }
    return this._restaurantForm!;
  }

  constructor(
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<RestaurantFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { restaurant?: Restaurant }
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const restaurant: Restaurant = {
      name: this.restaurantForm.get('name')?.value,
      address: this.restaurantForm.get('address')?.value,
      description: this.restaurantForm.get('description')?.value,
      cuisine: this.restaurantForm.get('cuisine')?.value,
    };
    if (this.data?.restaurant) {
      restaurant.id = this.data?.restaurant?.id;
    }
    this._dialogRef.close(restaurant);
  }
}
