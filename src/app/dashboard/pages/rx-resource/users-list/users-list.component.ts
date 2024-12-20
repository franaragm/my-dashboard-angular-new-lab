import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@interfaces/req-response';

@Component({
  selector: 'app-users-list',
  imports: [RouterLink],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  public readonly users: InputSignal<User[]> = input.required<User[]>();
}
