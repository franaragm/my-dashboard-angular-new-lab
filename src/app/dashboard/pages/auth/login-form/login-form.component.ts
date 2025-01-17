import { ChangeDetectionStrategy, Component, computed, effect, inject, output, OutputEmitterRef, signal, viewChild, WritableSignal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormsService } from '@services/forms.service';
import { LoginDto } from '../auth.model';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly formsService = inject(FormsService);

  /**
   * Emits an event when the form is submitted
   * - It is an output emitter
   * @example
   * <app-login-form (login)="login($event)" />
   * */
  public readonly login: OutputEmitterRef<LoginDto> = output<LoginDto>();

  protected email: string = '';
  protected password: string = '';

  /**
   * Checks if the model must be marked as invalid
   * - It is a helper function to avoid pristine invalid marks
   * */
  protected readonly modelInvalid = (model: NgModel): boolean | undefined => this.formsService.modelInvalid(model);

  /**
   * Submits the form value
   */
  protected submit(): void {
    const loginDto: LoginDto = {
      email: this.email,
      password: this.password,
    };
    this.login.emit(loginDto);
  }
}
