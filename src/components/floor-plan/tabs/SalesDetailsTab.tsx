import { InputLabel } from "@mui/material";
import { Vehicle } from "../../../types/vehicle";
import InputField from "../../common/InputField";

type SalesDetailsProps = {
  vehicleData: Vehicle | undefined;
};

function SalesDetailsTab(props: SalesDetailsProps) {
  const { vehicleData } = props;

  const mainContainer: React.CSSProperties = {
    background: "white",
    width: "97%",
    borderRadius: "20px",
    padding: "20px 20px 5px 20px",
    marginBottom: "20px",
  };

  const detailsContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "150px",
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
          <div style={{ width: "48%" }}>
            <InputLabel sx={inputLabel}>Purchase Date</InputLabel>
            <InputField
              size="small"
              disabled
              style={inputField}
              value={vehicleData?._purchaseDate}
            />
          </div>
          <div style={{ width: "48%" }}>
            <InputLabel sx={inputLabel}>Purchase Amount</InputLabel>
            <InputField
              size="small"
              style={inputField}
              disabled
              value={vehicleData?._purchaseAmount}
            />
          </div>
          <div style={{ width: "48%" }}>
            <InputLabel sx={inputLabel}>Title Location</InputLabel>
            <InputField size="small" style={inputField} disabled value={vehicleData?._location} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesDetailsTab;
