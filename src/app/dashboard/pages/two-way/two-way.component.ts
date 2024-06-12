import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { TabbedPaneComponent } from "./tabbed-pane.component";
import { TabComponent } from "./tab.component";

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent, TabbedPaneComponent, TabComponent],
  template: `
    <app-title title="Two way" />

    <div class="pane-container">

      <!-- <app-tabbed-pane [current]="current" (currentChange)="myFunction($event)"> -->
      <app-tabbed-pane [(current)]="current">
        <app-tab title="1st tab">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam at quam facilis ducimus maxime
          suscipit numquam quidem quis autem? Dicta consequuntur a, laudantium iusto unde praesentium inventore fugit
          quibusdam.
        </app-tab>
        <app-tab title="2nd tab">
          Sammas ergo gemma, ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam at quam facilis ducimus
          maxime suscipit numquam quidem quis autem? Dicta consequuntur a, laudantium iusto unde praesentium inventore fugit
          quibusdam.
        </app-tab>
        <app-tab title="3nd tab">
          Gemma ham ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam at quam facilis ducimus maxime
          suscipit numquam quidem quis autem? Dicta consequuntur a, laudantium iusto unde praesentium inventore fugit
          quibusdam.
        </app-tab>
      </app-tabbed-pane>

      <p class="current-info">
        Current: {{ current() }}
      </p>

    </div>

    
  `,
  styles: `
    .pane-container {
      margin-top: 20px;
      max-width: 600px;
    }
    .current-info {
      margin-top: 20px;
    }
  `
})
export default class TwoWayComponent {
  current = signal(0);

}
