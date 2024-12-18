import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-rx-resource',
  imports: [ 
    TitleComponent 
  ],
  templateUrl: './rx-resource.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RxResourceComponent { 

  

  // como conectar un observable asincrono de una llamada api 
  // a un signal sincrono con rxResource y como manejar el status, value y error


}
