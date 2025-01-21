import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent { 
  label = input.required<string>();
  confirmed = output<string>();

  confirm(): void {
    this.confirmed.emit(this.label());
  }

}
