import { UserBusiness } from "./business";
import { Vehicle } from "./vehicle";

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

export interface Countries {
  _id: string;
  _name: string;
  _countryCode: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface UpdateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  token: string;
  updatedBy: string;
}
export interface UpdateUserParams {
  userId: string;
  type: string;
  updateUserBody: UpdateUserBody;
}

export enum UserTypeEnum {
  CUSTOMER = "customer",
  STAFF = "staff",
  ADMIN = "admin",
}

export enum UserStatusEnum {
  APPROVED = "approved",
  REJECTED = "rejected",
  PENDING = "pending",
}

export interface User {
  _email: string;
  _firstName?: string;
  _id: string;
  _lastName?: string;
  _methodOfCommunication?: string;
  _mobileNumber?: string;
  _password: string;
  _preferredLanguage?: string;
  _status?: UserStatusEnum;
  _token?: string;
  _type?: UserTypeEnum;
  _updatedAt?: string;
  _updatedBy?: string;
  _createdAt?: string;
  _createdBy?: string;
  _country?: Countries;
  _businesses: UserBusiness[];
  _vehicles: Vehicle[];
}
