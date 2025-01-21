import { ChangeDetectionStrategy, Component, viewChild, ViewContainerRef } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { map, race, timer } from 'rxjs';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-toast-demo',
  imports: [
    TitleComponent,
  ],
  templateUrl: './toast-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToastDemoComponent {
  counter = 0;
  placeholder = viewChild.required('placeholder', { read: ViewContainerRef });

  show() {
    // se instancia y se añade el component en el placeholder además de obtener referencia a component
    const ref = this.placeholder()?.createComponent(ToastComponent);
    
    this.counter++;
    const title = 'Message #' + this.counter;

    // se setea el input label del componente
    ref.setInput('label', title);

    // se crea observable de output(confirmed en este ejemplo) del componente usando el metodo outputToObservable que 
    // devuelve un observable de un output del componente
    const confirmed$ = outputToObservable(ref.instance.confirmed)
      .pipe(map(title => ({ trigger: 'confirmed', title })));

    // observable que emite un valor despues de un tiempo
    const timer$ = timer(5000)
      .pipe(map(() => ({ trigger: 'timeout', title })));

    // se suscribe a los observables y se destruye el componente en el momento que uno de los dos observables emita un valor
    race(confirmed$, timer$).subscribe(action => {
      ref?.destroy(); // se destruye el componente
      console.log('action', action);
    });

  }

}
