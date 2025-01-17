import { ChangeDetectionStrategy, Component, computed, effect, inject, output, OutputEmitterRef, signal, viewChild, WritableSignal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormsService } from '@services/forms.service';
import { RegisterDto } from '../auth.model';


@Component({
  selector: 'app-register-form',
  imports: [FormsModule],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly formsService = inject(FormsService);

  public readonly register: OutputEmitterRef<RegisterDto> = output<RegisterDto>();

  protected readonly email: WritableSignal<string> = signal('');
  protected readonly password: WritableSignal<string> = signal('');
  protected readonly confirmPassword: WritableSignal<string> = signal('');

  /**
   * Checks if the model must be marked as invalid
   * - It is a helper function to avoid pristine invalid marks
   */
  protected readonly modelInvalid = (model: NgModel): boolean | undefined => this.formsService.modelInvalid(model);

  /**
   * The confirm password model template reference
   * - A view child signal to selects an element by its _Angular#Id_
   */
  protected readonly confirmPasswordModel = viewChild<NgModel>('confirmPasswordModel');


  /**
   * The password validation effect
   * - It is an effect to validate the passwords are the same
   * - Triggers when:
   * - the confirm password model changes
   * - the passwords matches computed signal changes
   */
  private passwordValidationEffect = effect(() => {
    // Triggers
    const password = this.password();
    const confirmPassword = this.confirmPassword();
    const passwordMatches = password === confirmPassword;
    const model = this.confirmPasswordModel();
    if (!model) return;
    // Effects
    const control = model.control;
    if (passwordMatches) {
      control.setErrors(null);
    } else {
      control.setErrors({ passwordMismatch: true });
    }
  });

  protected submit(): void {
    const registerDto: RegisterDto = {
      email: this.email(),
      password: this.password(),
    };
    this.register.emit(registerDto);
  }
}
