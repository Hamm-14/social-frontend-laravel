import { InputLabel, Typography } from "@mui/material";
import { Vehicle } from "../../../types/vehicle";
import ButtonComponent from "../../common/ButtonComponent";
import InputField from "../../common/InputField";

type VehicleInfoProps = {
  vehicleData: Vehicle | undefined;
  comment: string | undefined;
  setComment: (args: string) => void;
  handleSaveComment: () => void;
};

function VehicleInformationTab(props: VehicleInfoProps) {
  const { vehicleData, comment, setComment, handleSaveComment } = props;

  const mainContainer: React.CSSProperties = {
    background: "white",
    width: "96%",
    borderRadius: "20px",
    padding: "20px 20px 5px 20px",
    marginBottom: "15px",
  };

  const vinContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "150px",
    justifyContent: "space-between",
  };

  const odometerContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    height: "240px",
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
        <div style={vinContainer}>
          <div style={{ width: "32%" }}>
            <InputLabel sx={inputLabel}>VIN</InputLabel>
            <InputField value={vehicleData?._vin} size="small" disabled style={inputField} />
          </div>
          <div style={{ width: "32%" }}>
            <InputLabel sx={inputLabel}>Year</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._year} disabled />
          </div>
          <div style={{ width: "32%" }}>
            <InputLabel sx={inputLabel}>Brand Name</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._brandName} disabled />
          </div>
          <div style={{ width: "32%" }}>
            <InputLabel sx={inputLabel}>Model Name</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._modelName} disabled />
          </div>
          <div style={{ width: "32%" }}>
            <InputLabel sx={inputLabel}>Variant</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._variant} disabled />
          </div>
          <div style={{ width: "32%" }}>
            <InputLabel sx={inputLabel}>MMR Value</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._mmrValue} disabled />
          </div>
        </div>
        <Typography sx={{ color: "#002F86", fontWeight: 600, marginBottom: "15px" }}>
          Odometer & Colour
        </Typography>
        <div style={odometerContainer}>
          <div style={{ width: "49%" }}>
            <InputLabel sx={inputLabel}>Odometer</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._odometer} disabled />
          </div>
          <div style={{ width: "49%" }}>
            <InputLabel sx={inputLabel}>Color</InputLabel>
            <InputField size="small" style={inputField} value={vehicleData?._color} disabled />
          </div>
          <div style={{ width: "100%" }}>
            <InputLabel sx={inputLabel}>Comment</InputLabel>
            <InputField
              size="small"
              style={inputField}
              multiline
              rows={3}
              placeholder="Comment Here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div style={{ width: "100%", textAlign: "end" }}>
            <ButtonComponent
              buttonName="Save Comment"
              buttonStyle={{ color: "#0AB2FA", background: "white", border: "1px solid #0AB2FA" }}
              onClick={handleSaveComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleInformationTab;
