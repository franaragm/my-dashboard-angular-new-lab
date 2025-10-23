import { ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { AuthRepository } from '@services/auth.repository';
import { TitleComponent } from '@shared/title/title.component';
import { AuthStore } from './auth.store';
import { LoginDto, NULL_LOGIN_DTO, NULL_USER_TOKEN, UserTokenDto } from './auth.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoginFormComponent } from './login-form/login-form.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    TitleComponent,
    LoginFormComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private readonly authRepository = inject(AuthRepository);
  private readonly authStore = inject(AuthStore); // Add this line to define authStore

  private readonly loginDto: WritableSignal<LoginDto> = signal<LoginDto>(NULL_LOGIN_DTO);

  /**
   * con la condición del stream evitamos que al cargar el componente se haga automaticamente una llamada a api 
   * retornando un observable con undefined si los datos de login no estan seteados
   * 
   * se lanza cuando el valor de signal loginDto cambia por el parametro params
   */
  private readonly loginResource = rxResource<UserTokenDto | undefined, LoginDto>({
    params: () => this.loginDto(),
    stream: ({ params }) =>
      params === NULL_LOGIN_DTO
        ? of(undefined) // no hace llamada ni emite valor
        : this.authRepository.postLogin$(params),
  });

  /**
   * este effect se lanzará cada vez que el componente se monte y cada vez que el valor de loginResource cambie
   */
  private readonly storeEffect = effect(() => {
    const userToken = this.loginResource.value();
    console.log(userToken);
    if (userToken && userToken !== NULL_USER_TOKEN) {
      this.authStore.dispatchLogin(userToken);
    } else {
      this.authStore.dispatchLogout();
    }
  });

  /**
   * Logs in a user
   */
  protected login(loginDto: LoginDto) {
    console.log(loginDto);
    this.loginDto.set(loginDto);
    // this.loginResource.reload();
  }
}
