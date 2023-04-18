import { UserBusiness } from "./business";
import { User } from "./user";

export interface UserCreditLineData {
  email: string;
  firstName: string;
  lastName: string;
  methodOfCommunication: string;
  mobileNumber: string;
  createdBy: string;
  preferredLanguage: string;
  countryId: string;
}

export interface CreditLineFormData {
  email: string;
  firstName: string;
  lastName: string;
  preferredCommunication: string;
  mobileNumber: string;
  preferredLanguage: string;
  countryId: string;
  businessName: string;
  isDealerLicense: boolean | null;
  businessPhoneNumber: string;
  auctionAccessNumber: string;
  businessAddress: string;
  city: string;
  state: string;
  zip: string;
  createdBy: string | null;
}

export interface ErrorCreditLineForm {
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  preferredCommunication: boolean;
  mobileNumber: boolean;
  preferredLanguage: boolean;
  countryId: boolean;
  businessName: boolean;
  isDealerLicense: boolean;
  businessPhoneNumber: boolean;
  auctionAccessNumber: boolean;
  businessAddress: boolean;
  city: boolean;
  state: boolean;
  zip: boolean;
}

export interface ErrorHelperTextCreditLineForm {
  email: string;
  firstName: string;
  lastName: string;
  preferredCommunication: string;
  mobileNumber: string;
  preferredLanguage: string;
  countryId: string;
  businessName: string;
  isDealerLicense: string;
  businessPhoneNumber: string;
  auctionAccessNumber: string;
  businessAddress: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessData {
  businessName: string;
  isDealerLicense: boolean | null;
  businessPhoneNumber: string;
  auctionAccessNumber: string;
  businessAddress: string;
  city: string;
  state: string;
  zip: string;
  createdBy: string | null;
}
export interface AddCreditLine {
  userData: UserCreditLineData;
  businessData: BusinessData;
}
export interface CreditLine {
  _id: string;
  _status: StatusTypeEnum;
  _approvedAmount: number;
  _utilizedCredit: number;
  _applicationId: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt: string;
  _updatedAt: string;
  creditIncreaseRequest: CreditIncreaseRequest | null;
  _user: User;
  _businesses: UserBusiness;
}

export interface CreditIncreaseRequest {
  _approvedAmount: number;
  _createdAt: string;
  _createdBy: string;
  _id: string;
  _requestAmount: number;
  _comment: string;
  _status: StatusTypeEnum | undefined;
  _updatedAt: string;
  _updatedBy: string;
}

export enum StatusTypeEnum {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
}

export interface CreditAmountIncrease {
  requestAmount: number;
  createdBy: string | null;
  updatedBy: string | null;
}
export interface Country {
  _id: string;
  _name: string;
  _countryCode: string;
  _createdAt: string;
  _updatedAt: string;
}
