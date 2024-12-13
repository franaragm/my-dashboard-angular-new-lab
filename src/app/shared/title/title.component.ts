import { Component, Input, InputSignal, booleanAttribute, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-title',
    imports: [CommonModule],
    template: `
  <h1 class="text-3xl mb-5">{{ title() }}</h1>
  `
})
export class TitleComponent {

  // @Input({ required: true }) title!: string;
  // @Input({ transform: booleanAttribute }) withShadow:boolean = false;
  
  // Readonly
  // title: InputSignal<string> = input('');
  // title = input<string>('');
  // title = input<string>();
  title = input.required<string>();

  withShadow = input<boolean, string>(false, { transform: booleanAttribute });

  numItems = input<number, any[]>(0, {
    transform: (listItems) => listItems.length
  });

}
