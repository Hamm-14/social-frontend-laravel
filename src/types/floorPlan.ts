import { Vehicle, VehicleData } from "./vehicle";
import { User } from "./user";
import { CreditLine } from "./creditLine";
import { BankAccount } from "./bankAccount";
import { GetLoanTerms } from "./loanTerms";

export enum StatusTypeEnum {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  DRAFT = "draft",
}

export enum FormStepEnum {
  VEHICLE_INFORMATION = "vehicle information",
  SALE_DETAILS = "sale details",
  PAYMENT_INFORMATION = "payment information",
  DOCUMENTATION_UPLOAD = "documentation uplaod",
  COMPLETION = "completion",
}
export interface FloorPlan {
  _id: string;
  _paymentTo: string;
  _status: StatusTypeEnum;
  _comment: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt: string;
  _updatedAt: string;
  _user: User;
  _vehicle: Vehicle;
}

export interface GetFloorPlan {
  _id: string;
  _paymentTo: string;
  _status: StatusTypeEnum;
  _comment: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt: string;
  _updatedAt: string;
  _creditLineApplication: CreditLine;
  _vehicle: Vehicle;
  _bankAccount: BankAccount;
  _LoanTerms: GetLoanTerms;
}
export interface UpdateFloorPlan {
  id?: string;
  comment?: string | null;
  paymentTo?: string;
  lineOfCreditId?: string;
  bankAccountId?: string;
  updatedBy?: string | null;
  vehicleData?: VehicleData;
  fileData?: any;
}

export interface CreateLoanTermsData {
  id?: string;
  approvedLoanAmount: number | null;
  loanTerm: string;
  amortization: string;
  interestRate: number | null;
  modeOfPayment: string;
  createdBy: string | null;
  updatedBy: string | null;
}
