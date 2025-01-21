import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-form-demo',
  imports: [
    TitleComponent,
    FormsModule
  ],
  templateUrl: './form-demo.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormDemoComponent { 
  // form = viewChild.required(NgForm);
  userNameCtrl = viewChild.required<ElementRef<HTMLInputElement>>('userNameCtrl');
  passwordCtrl = viewChild.required<ElementRef<HTMLInputElement>>('passwordCtrl');

  userName = signal('');
  password = signal('');

  //save(): void {
  save(form: NgForm): void {
    // const form = this.form();
    console.log(form);

    if (form.controls['userName'].invalid) {
      this.userNameCtrl().nativeElement.focus();
      return;
    }

    if (form.controls['password'].invalid) {
      this.passwordCtrl().nativeElement.focus();
      return;
    }

    console.log('save', this.userName(), this.password())
  }

}
