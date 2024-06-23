import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

  public handleError(body: HttpErrorResponse | any) {
    let errorMessage: string;
    if (body instanceof HttpErrorResponse) {
      const errBody = body.error || '';
      errorMessage = errBody;
    } else {
      errorMessage = 'Unknown Error. Please try again.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
