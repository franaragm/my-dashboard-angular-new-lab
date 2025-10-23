/**
 * User token returned by the login API
 */
export type UserTokenDto = {
    id?: string;
    token: string;
}

/**
 * The null user token
 */
export const NULL_USER_TOKEN: UserTokenDto = {
    id: '',
    token: ''
};

/**
 * The login data transfer object
 */
export type LoginDto = {
    email: string;
    password: string;
};

export const NULL_LOGIN_DTO: LoginDto = { email: '', password: '' };

/**
* The register data transfer object
*/
export interface RegisterDto {
    email: string;
    password: string;
}

/**
 * The null register dto
 */
export const NULL_REGISTER_DTO: RegisterDto = { email: '', password: '' };