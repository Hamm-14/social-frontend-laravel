export interface BankAccount {
  _id: string;
  _bankName: string;
  _bankHolderName: string;
  _bankBranch: string;
  _bankAccountNumber: string;
  _ifscCode: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export interface CreateBankAccount {
  bankName: string;
  bankHolderName: string;
  bankBranch: string;
  bankAccountNumber: string;
  ifscCode: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}
