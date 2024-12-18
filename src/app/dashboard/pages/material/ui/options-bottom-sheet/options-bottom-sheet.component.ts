import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-options-bottom-sheet',
  imports: [MatListModule],
  templateUrl: './options-bottom-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsBottomSheetComponent {
  openLink(event: MouseEvent) {
    console.log('openLink', event);
  }
}
