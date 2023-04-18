import { InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import {
  useGetCreditLineQuery,
  useUpdateCreditLineApplicationStatusMutation,
} from "../../apis/creditLine";
import { useParams } from "react-router-dom";
import ButtonComponent from "../common/ButtonComponent";
import InputField from "../common/InputField";
import ApproveCreditLineRequestModal from "./approveCreditLineRequestModal";
import { StatusTypeEnum } from "../../types/creditLine";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const buttonContainer: React.CSSProperties = {
  position: "fixed",
  top: "92%",
  width: "96%",
  display: "flex",
  justifyContent: "flex-end",
  height: 40,
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
  marginBottom: "20px",
};

const typoStyle: React.CSSProperties = { color: "#002F86", fontWeight: 600, marginBottom: "15px" };

const CreditLineDetailView = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { id: creditLineId } = useParams();
  const { data } = useGetCreditLineQuery(creditLineId);
  const [UpdateCreditLineApplicationStatus] = useUpdateCreditLineApplicationStatusMutation();

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAcceptClick = () => {
    setOpenModal(true);
  };

  const handleRejectClick = async () => {
    const data = {
      applicationId: creditLineId ? creditLineId : "",
      approvedAmount: 0,
      status: StatusTypeEnum.DECLINED,
    };
    await UpdateCreditLineApplicationStatus(data).unwrap();
  };

  return (
    <div style={mainContainer}>
      <Typography
        sx={{
          height: 20,
          position: "fixed",
          top: 85,
          left: "86%",
        }}
      >
        Status:{" "}
        <span
          style={{
            textTransform: "capitalize",
            color:
              data?._status === "pending"
                ? "#FF9900"
                : data?._status === "approved"
                ? "#33C43B"
                : "#FF0B0B",
          }}
        >
          {data?._status}
        </span>
      </Typography>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <Header title="Credit Line Application" />
      <div style={{ width: "80%", marginTop: "7%" }}>
        <div style={{ height: 510, overflow: "scroll", marginTop: 20 }} className="hide-scrollbar">
          <div style={contentDivs}>
            <Typography style={typoStyle}>Country & Language</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "48%" }}>
                <InputLabel style={inputLabel}>Country</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._user._country?._name}
                  disabled
                />
              </div>
              <div style={{ width: "48%" }}>
                <InputLabel style={inputLabel}>Preferred Language</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._user?._preferredLanguage}
                  disabled
                />
              </div>
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Contact Information</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 170,
              }}
            >
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>First Name</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._user?._firstName}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>Last Name</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._user?._lastName}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>Email Address</InputLabel>
                <InputField size="small" style={inputField} value={data?._user._email} disabled />
              </div>
              <div style={{ width: "48%" }}>
                <InputLabel style={inputLabel}>Phone Number</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._user?._mobileNumber}
                  disabled
                />
              </div>
              <div style={{ width: "48%" }}>
                <InputLabel style={inputLabel}>Preferred Method of Communication</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._user?._methodOfCommunication}
                  disabled
                />
              </div>
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Business Information</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 270,
              }}
            >
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>Dealer License</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businesses?._isDealerLicense ? "Yes" : "No"}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>Exact Legal Business</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businesses?._businessName}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>Business Phone Number</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businesses?._businessPhoneNumber}
                  disabled
                />
              </div>
              <div style={{ width: "100%" }}>
                <InputLabel style={inputLabel}>Business Address</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  multiline
                  rows={3}
                  value={data?._businesses?._businessAddress}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>City</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businesses?._city}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>State</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businesses?._state}
                  disabled
                />
              </div>
              <div style={{ width: "32%" }}>
                <InputLabel style={inputLabel}>ZIP</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  value={data?._businesses?._zip}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={buttonContainer}>
        <ButtonComponent
          buttonName="Reject"
          buttonStyle={{
            color: "white",
            background:
              data?._status === "approved" || data?._status === "declined" ? "#b3b7bf" : "#FA1010",
            marginLeft: "10px",
          }}
          onClick={handleRejectClick}
          disabled={data?._status === "approved" || data?._status === "declined"}
        />
        <ButtonComponent
          buttonName="Accept"
          buttonStyle={{
            color: "white",
            background: data?._status === "approved" ? "#b3b7bf" : "#0AB2FA",
            marginLeft: "10px",
          }}
          onClick={handleAcceptClick}
          disabled={data?._status === "approved"}
        />
      </div>
      <ApproveCreditLineRequestModal
        open={openModal}
        handleClose={handleModalClose}
        creditLineId={creditLineId}
      />
    </div>
  );
};

export default CreditLineDetailView;
