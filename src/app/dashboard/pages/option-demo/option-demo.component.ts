import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-option-demo',
  imports: [
    TitleComponent,
    OptionComponent
  ],
  templateUrl: './option-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OptionDemoComponent { }
