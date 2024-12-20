import { ChangeDetectionStrategy, Component, computed, inject, ResourceRef, ResourceStatus, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { User } from '@interfaces/req-response';
import { UsersRepository } from '@services/users.repository';
import { TitleComponent } from '@shared/title/title.component';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-rx-resource',
  imports: [ 
    TitleComponent,
    UsersListComponent
  ],
  templateUrl: './rx-resource.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RxResourceComponent { 
  // como conectar un observable asincrono de una llamada api 
  // a un signal sincrono con rxResource y como manejar el status, value y error

  private readonly usersRepository = inject(UsersRepository);

  /**
   * Resource of users
   * - Has signals with value, error, and working status
   */
  private readonly usersResource: ResourceRef<User[]> = rxResource(
    { loader: this.usersRepository.getAllUsers$ }
  );

  /**
   * Array of users
   * - Signal computed from the users resource
  */
  protected readonly users: Signal<User[]> = computed(() => this.usersResource.value() ?? []);

  /**
   * Error message
   * - Signal computed from the users resource error
   */
  protected readonly errorMessage: Signal<string> = computed(
    () => ( this.usersResource.error() as { message: string } )['message'] || 'Unknown error'
  );

  protected readonly status: Signal<string> = computed(() => ResourceStatus[this.usersResource.status()]);

  /**
   * metodo que ejecuta un reload (vuelve a ejecutar loade de rxResource)
   */
  protected reloadUsers(): void {
    this.usersResource.reload();
  }

}
