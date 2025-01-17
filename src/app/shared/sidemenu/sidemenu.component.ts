import { Component, inject, Signal } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../dashboard/pages/auth/auth.store';

@Component({
  selector: 'app-sidemenu',
  imports: [RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  private readonly authStore = inject(AuthStore);

  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'));

  /**
   * Selects if the user is authenticated
   * */
  protected isAuthenticated: Signal<boolean> = this.authStore.selectIsAuthenticated;

  /**
   * Logs out the user
   */
  protected logout() {
    this.authStore.dispatchLogout();
  }

  constructor() {
    // const dashboardRoutes = routes
    //   .map( route => route.children ?? [] )
    //   .flat()
    //   .filter( route => route && route.path )
    //   .filter( route => !route.path?.includes(':') )
    // console.log(dashboardRoutes);
  }

}
