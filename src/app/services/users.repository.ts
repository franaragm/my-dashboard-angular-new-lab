import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { User, UserResponse, UsersResponse } from '@interfaces/req-response';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly usersEndpoint = `${this.apiUrl}/users`;
  private readonly apiKey = environment.apiKey;
  private readonly headers = { headers: { 'x-api-key': this.apiKey } };

  /**
   * Gets all users
   * @returns An observable of users
   */
  public getAllUsers$ = (): Observable<User[]> =>
    this.http.get<UsersResponse>(this.usersEndpoint, this.headers).pipe(
      delay(1500),
      map((resp: UsersResponse) => resp.data)
    );

  /* 
  getAllUsers$(): Observable<User[]> {
    return this.http.get<UsersResponse>(this.usersEndpoint, this.headers).pipe(
      delay(1500),
      map((resp: UsersResponse) => resp.data)
    );
  } 
  */

    /**
   * Gets a user by id
   * @param id - The user id
   * @returns An observable of user with the given id
   */
  public getUserById$ = (id: string): Observable<User> =>
    this.http.get<UserResponse>(`${this.usersEndpoint}/${id}`, this.headers).pipe(
      delay(1500),
      map((resp: UserResponse) => resp.data)
    );

  /* 
  getUserById$(id: string): Observable<User> {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`, this.headers)
      .pipe(
        delay(1500),
        map((resp: UserResponse) => resp.data)
      )
  } 
  */

}