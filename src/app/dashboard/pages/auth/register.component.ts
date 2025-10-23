import { ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { NULL_REGISTER_DTO, NULL_USER_TOKEN, RegisterDto, UserTokenDto } from './auth.model';
import { AuthRepository } from '@services/auth.repository';
import { of } from 'rxjs';
import { AuthStore } from './auth.store';

@Component({
  selector: 'app-register',
  imports: [
    TitleComponent,
    RegisterFormComponent
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent { 
  private readonly authRepository = inject(AuthRepository);
  private readonly authStore = inject(AuthStore); // Add this line to define authStore
  private  readonly registerDto: WritableSignal<RegisterDto> = signal<RegisterDto>(NULL_REGISTER_DTO);

  /**
   * con la condición del stream evitamos que al cargar el componente se haga automaticamente una llamada a api 
   * retornando un observable con undefined si los datos de registro no estan seteados
   * 
   * se lanza cuando el valor de signal registerDto cambia por el parametro params
   */
  private readonly registerResource = rxResource<UserTokenDto | undefined, RegisterDto>({
    params: () => this.registerDto(),
    stream: ({ params }) => 
      params === NULL_REGISTER_DTO
        ? of(undefined) // no hace llamada ni emite valor
        : this.authRepository.postRegister$(params)
  });

  /**
   * este effect se lanzará cada vez que el componente se monte y cada vez que el valor de registerResource cambie
   */
  private readonly storeEffect = effect(() => {
    const userToken = this.registerResource.value();
    console.log(userToken);
    if (userToken && userToken !== NULL_USER_TOKEN) {
      this.authStore.dispatchLogin(userToken);
    } else {
      this.authStore.dispatchLogout();
    }
  });

  protected register(registerDto: RegisterDto) {
    console.log(registerDto);
    this.registerDto.set(registerDto);
    // this.registerResource.reload(); // recarga el recurso con los datos de registro
  }
}
