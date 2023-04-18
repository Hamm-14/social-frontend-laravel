import { InputLabel } from "@mui/material";
import { GetFloorPlan } from "../../../types/floorPlan";
import InputField from "../../common/InputField";

type PayInfoProps = {
  floorPlanData: GetFloorPlan | undefined;
};

function PaymentInformationTab(props: PayInfoProps) {
  const { floorPlanData } = props;

  const mainContainer: React.CSSProperties = {
    background: "white",
    width: "97%",
    borderRadius: "20px",
    padding: "20px 20px 25px 20px",
    marginBottom: "20px",
  };

  const detailsContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  };

  const inputLabel: React.CSSProperties = {
    color: "black",
  };

  const inputField: React.CSSProperties = {
    background: "#F5F6F8",
    width: "100%",
  };

  return (
    <div>
      <div style={mainContainer}>
        <div style={detailsContainer}>
          <div style={{ width: "37%" }}>
            <InputLabel sx={inputLabel}>Line Of Credit</InputLabel>
            <InputField
              size="small"
              disabled
              style={inputField}
              value={floorPlanData?._creditLineApplication._applicationId}
            />
          </div>
          <div style={{ width: "20%" }}>
            <InputLabel sx={inputLabel}>Payment To</InputLabel>
            <InputField
              size="small"
              disabled
              style={inputField}
              value={floorPlanData?._paymentTo}
            />
          </div>
          <div style={{ width: "37%" }}>
            <InputLabel sx={inputLabel}>Deposit Account</InputLabel>
            <InputField
              size="small"
              disabled
              style={inputField}
              value={floorPlanData?._bankAccount._bankName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInformationTab;
