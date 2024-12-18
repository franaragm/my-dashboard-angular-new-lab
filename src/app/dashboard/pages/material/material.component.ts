import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { OptionsBottomSheetComponent } from './ui/options-bottom-sheet/options-bottom-sheet.component';

@Component({
  selector: 'app-material',
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatBottomSheetModule
  ],
  templateUrl: './material.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaterialComponent {
  private _bottomSheet = inject(MatBottomSheet); 

  openBottomSheet(): void {
    this._bottomSheet.open(OptionsBottomSheetComponent);
  }
}
