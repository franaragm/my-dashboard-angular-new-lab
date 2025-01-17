import { Injectable } from '@angular/core';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  /**
   * Checks if the model must be marked as invalid
   * - It is a helper function to avoid pristine invalid marks
   */
  public modelInvalid(model: NgModel): boolean | undefined {
    if (!model.touched) return undefined;
    return model.invalid === true;
  }
}