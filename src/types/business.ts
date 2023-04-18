import { User } from "./user";

export interface UserBusiness {
  _id: string;
  _businessName: string;
  _isDealerLicense: boolean;
  _businessPhoneNumber: string;
  _auctionAccessNumber: string;
  _businessAddress: string;
  _city: string;
  _state: string;
  _zip: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt: string;
  _user: User;
}
