import { Component, input, inject, computed } from '@angular/core';
import { TabbedPaneComponent } from './tabbed-pane.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  template: `
    @if(visible()) {
      <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ title() }}</h2>
        <p class="font-normal text-gray-700">
            <ng-content></ng-content>
        </p>
      </div>
    }
  `,
})
export class TabComponent {
    // se injecta el componente padre para acceder a sus propiedades
    pane = inject(TabbedPaneComponent);

    // input signal requerido de tipo string
    title = input.required<string>();

    // señal computada que se lanza cada vez que cambia el currentTab del componente padre injectado 
    // y se compara con el componente actual con this, esto sirve para que mediante control-flow en plantilla 
    // mostrar u ocultar el el contenido del componente hijo
    visible = computed(() => this.pane.currentTab() === this);
}