import { InputLabel, Typography } from "@mui/material";
import React from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import { useGetBusinessQuery } from "../../apis/business";
import { useParams } from "react-router-dom";
import InputField from "../common/InputField";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const inputLabel: React.CSSProperties = {
  color: "black",
};

const inputField: React.CSSProperties = {
  background: "#F5F6F8",
  width: "100%",
};

const contentDivs: React.CSSProperties = {
  background: "white",
  width: "92%",
  borderRadius: "20px",
  padding: "20px 20px 25px 20px",
  margin: "20px 0px 20px 0px",
};

const typoStyle: React.CSSProperties = {
  color: "#002F86",
  fontWeight: 600,
  marginBottom: "15px",
  letterSpacing: 0.5,
};

const BusinessDetailView = () => {
  const { id: businessId } = useParams();
  const { data } = useGetBusinessQuery(businessId);

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Business Information" />
        <div style={{ marginTop: "8%" }}>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Business Details</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 155,
              }}
            >
              <div style={{ width: "49%" }}>
                <InputLabel style={inputLabel}>Business Name</InputLabel>
                <InputField size="small" style={inputField} value={data?._businessName} disabled />
              </div>
              <div style={{ width: "49%" }}>
                <InputLabel style={inputLabel}>Business Phone</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businessPhoneNumber}
                  disabled
                />
              </div>
              <div style={{ width: "49%" }}>
                <InputLabel style={inputLabel}>Auction Access Number</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._auctionAccessNumber}
                  disabled
                />
              </div>
              <div style={{ width: "49%" }}>
                <InputLabel style={inputLabel}>Dealer License</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._isDealerLicense ? "Yes" : "No"}
                  disabled
                />
              </div>
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Address Details</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 200,
              }}
            >
              <div style={{ width: "100%" }}>
                <InputLabel style={inputLabel}>Business Address</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businessAddress}
                  disabled
                  multiline
                  rows={3}
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>City</InputLabel>
                <InputField size="small" style={inputField} value={data?._city} disabled />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>State</InputLabel>
                <InputField size="small" style={inputField} value={data?._state} disabled />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>ZIP</InputLabel>
                <InputField size="small" style={inputField} value={data?._zip} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailView;
