export interface UserData {
  email: string;
  password: string;
}

export interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface IGenericResponse {
  email: string;
  access_token: string;
}
