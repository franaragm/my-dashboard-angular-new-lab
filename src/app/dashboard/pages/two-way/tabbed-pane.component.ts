import { Component, computed, contentChildren, model, output } from '@angular/core';
import { TabComponent } from './tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabbed-pane',
  standalone: true,
  imports: [CommonModule],
  template: `
  

    <div class="pane">
      <div class="nav" role="group">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500">
          @for(tab of tabs(); track tab) {
            <li class="me-2">
                <button
                (click)="current.set($index)"
                class="inline-block px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white"
                [ngClass]="{'active text-white bg-blue-600': tab === currentTab()}"
                >{{ tab.title() }}</button>
            </li>
          }
        </ul>
      </div>
      <article>
        <ng-content></ng-content>
      </article>
    </div>
  `,
  styles: `
    .pane .nav {
      margin-bottom: 10px;
      width:auto;
    }
  `,
})
export class TabbedPaneComponent {

    // current = input(0);
    // currentChange = output<number>(); ---> (click)="currentChange.emit($index)"
    current = model(0);

    // con contentChildren se puede obtener el array de componentes hijos que se están proyectando en el contenido del componente padre
    tabs = contentChildren(TabComponent);

    // esta señal computada se actualiza cada vez que cambia el signal current y se obtiene el tab activo 
    currentTab = computed(() => this.tabs()[this.current()]);
}
