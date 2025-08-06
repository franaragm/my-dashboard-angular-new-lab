import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { LoginDto, RegisterDto, UserTokenDto } from "../dashboard/pages/auth/auth.model";

/**
 * The auth api repository
 * - It is a service to handle the authentication requests
 * @requires HttpClient to make the requests
 * @requires environment to get the api url
 */
@Injectable({
    providedIn: 'root',
})
export class AuthRepository {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;
    private readonly apiKey = environment.apiKey;
    private readonly headers = { headers: { 'x-api-key': this.apiKey } };

    /**
     * Login the user
     * @param login the login dto
     * @returns the observable user token dto
     */
    public postLogin$(login: LoginDto): Observable<UserTokenDto> {
        return this.http.post<UserTokenDto>(`${this.apiUrl}/login`, login, this.headers);
    }

    /**
     * Register the user
     * @param register the register dto
     * @returns the observable user token dto
     */
    public postRegister$(register: RegisterDto): Observable<UserTokenDto> {
        return this.http.post<UserTokenDto>(`${this.apiUrl}/register`, register, this.headers);
    }
}