import { InputLabel } from "@mui/material";
import { GetLoanTerms } from "../../../types/loanTerms";
import InputField from "../../common/InputField";

type LoanTermDetailsProps = {
  data: GetLoanTerms | undefined;
};

function LoanTermDetailsTab(props: LoanTermDetailsProps) {
  const { data } = props;
  const mainContainer: React.CSSProperties = {
    background: "white",
    width: "97%",
    borderRadius: "10px",
    padding: "20px 20px 5px 20px",
    marginBottom: "20px",
  };

  const detailsContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "300px",
    justifyContent: "space-between",
  };

  const inputLabel: React.CSSProperties = {
    color: "black",
    marginBottom: "10px",
  };

  const inputField: React.CSSProperties = {
    background: "#F5F6F8",
    width: "100%",
    textTransform: "capitalize",
  };

  return (
    <div>
      <div style={mainContainer}>
        <div style={detailsContainer}>
          <div style={{ width: "48%", marginBottom: "1rem" }}>
            <InputLabel sx={inputLabel}>Approved Loan Amount</InputLabel>
            <InputField
              size="small"
              style={inputField}
              value={data?._approved_loan_amount}
              disabled
            />
          </div>
          <div style={{ width: "48%", marginBottom: "1rem" }}>
            <InputLabel sx={inputLabel}>Loan Term</InputLabel>
            <InputField size="small" style={inputField} value={data?._loan_term} disabled />
          </div>
          <div style={{ width: "48%", marginBottom: "1rem" }}>
            <InputLabel sx={inputLabel}>Amortization</InputLabel>
            <InputField size="small" style={inputField} value={data?._amortization} disabled />
          </div>
          <div style={{ width: "48%", marginBottom: "1rem" }}>
            <InputLabel sx={inputLabel}>Static Interest Rate On Requested Amount</InputLabel>
            <InputField size="small" style={inputField} value={data?._interest_rate} disabled />
          </div>
          <div style={{ width: "48%", marginBottom: "1rem" }}>
            <InputLabel sx={inputLabel}>Mode of Payments </InputLabel>
            <InputField size="small" style={inputField} value={data?._mode_of_payment} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanTermDetailsTab;
