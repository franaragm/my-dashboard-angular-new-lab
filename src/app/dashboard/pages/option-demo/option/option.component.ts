import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
  label = input.required<string>();
  
  featured = input.required({
    transform: this.boolTranformer // booleanAttribute
  })

  boolTranformer(value: unknown): boolean {
    return value !== 'no';
  }
 }
