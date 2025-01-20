import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { AuthStore } from '../../auth/auth.store';
import { rxResource } from '@angular/core/rxjs-interop';
import { NULL_USER, User } from '@interfaces/req-response';
import { UsersRepository } from '@services/users.repository';

@Component({
  selector: 'app-user-details',
  imports: [
    TitleComponent
  ],
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDetailsComponent {
  private UsersRepository = inject(UsersRepository);
  private readonly authStore = inject(AuthStore);

  /**
   * The user id
   * - Comes from the route parameters
   * - Will be provided by the router
   * 
   * Modern Angular contains a feature which allows us to access route params as Inputs. 
   * To enable this amazing feature we can use the withComponentInputBinding config on the router.
   * 
   * export const appConfig: ApplicationConfig = {
   *  providers: [provideRouter(routes, withComponentInputBinding())]
   * };
   */
  public readonly id: InputSignal<string> = input.required<string>();

  protected readonly userResource = rxResource({
    request: () => this.id(),
    loader: (param) => this.UsersRepository.getUserById$(param.request)
  });

  protected readonly user: Signal<User> =  computed(() => this.userResource.value() || NULL_USER);

  public titleLabel: Signal<string> = computed(() => {
    if (this.user()) {
      return `Información del usuario: ${this.user().first_name} ${this.user().last_name} `;
    }

    return 'Información del usuario';
  });

  protected readonly isLoggedIn: Signal<boolean> = this.authStore.selectIsAuthenticated;


}
