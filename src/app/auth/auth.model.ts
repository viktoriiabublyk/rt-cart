export interface Token {
  key: string;
}



export interface User {
  username: string;
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_authenticated?: boolean;
  is_verified?: boolean;
  date_joined?: string;
  is_staff?: boolean;
  pk?: number;
  is_superuser?: boolean;
}



export interface AuthStateModel {
  initialized: boolean;
  loading: boolean;
  loaded?: boolean;
  token?: Token;
  user?: User;
  is_authenticated?: boolean;
}

export interface EmailPasswordData {
    username?: string;
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

export interface PasswordConfirm {
    new_password1: string;
    new_password2: string;
}

export interface LoginData {
    username: string;
    id: number;
    date_joined: string;
}

export interface EditProfileData {
    first_name: string;
    last_name: string;
    username: string;
}

export interface SimpleResponse {
    detail: string;
}
