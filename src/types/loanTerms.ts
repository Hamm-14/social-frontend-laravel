export interface GetLoanTerms {
  _amortization: string;
  _approved_loan_amount: number;
  _createdAt: string;
  _createdBy: string;
  _id: string;
  _interest_rate: number;
  _loan_term: string;
  _mode_of_payment: string;
  _updatedAt: string;
  _updatedBy: string;
}

export interface LoanTerms {
  _id: string;
  _approvedLoanAmount: number | null;
  _loanTerm: string;
  _amortization: string;
  _interestRate: number | null;
  _modeOfPayment: string;
  _createdBy: string | null;
  _updatedBy: string | null;
}
