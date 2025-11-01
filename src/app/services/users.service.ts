import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';

import type { User, UserResponse, UsersResponse } from '@interfaces/req-response';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly usersEndpoint = `${this.apiUrl}/users`;
  private readonly apiKey = environment.apiKey;
  private readonly headers = { headers: { 'x-api-key': this.apiKey } };

  #state = signal<State>({
    loading: true,
    users: [],
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {

    this.http.get<UsersResponse>(this.usersEndpoint, this.headers)
      .pipe(delay(1500))
      .subscribe(res => {

        this.#state.set({
          loading: false,
          users: res.data,
        })

      });

  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`${this.usersEndpoint}/${id}`, this.headers)
      .pipe(
        delay(1500),
        map(resp => resp.data)
      )

  }


}