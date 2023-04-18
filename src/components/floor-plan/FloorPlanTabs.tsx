import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import VehicleInformationTab from "./tabs/VehicleInformationTab";
import { useParams } from "react-router-dom";
import {
  useGetFloorPlanDetailsQuery,
  useUpdateFloorPlanRequestMutation,
  useUpdateFloorPlanRequestStatusMutation,
} from "../../apis/floorPlan";
import { FormStepEnum, UpdateFloorPlan } from "../../types/floorPlan";
import { StatusTypeEnum } from "../../types/creditLine";
import SalesDetailsTab from "./tabs/SalesDetailsTab";
import PaymentInformationTab from "./tabs/PaymentInformationTab";
import DocumentsListView from "./tabs/uploadedDocumentsTabComponent/DocumentsListView";
import { Typography } from "@mui/material";
import ButtonComponent from "../common/ButtonComponent";
import ApproveFloorPlanRequestModal from "./approveFloorPlanRequestModal";
import LoanTermDetailsTab from "./tabs/LoanTermsTab";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const tabsContainer: React.CSSProperties = {
  marginTop: "6%",
  width: "95%",
  padding: "1% 0% 0% 0%",
  marginBottom: 20,
};

const buttonContainer: React.CSSProperties = {
  position: "fixed",
  top: "92%",
  width: "72%",
  display: "flex",
  justifyContent: "flex-end",
  height: 40,
};

export default function FloorPlanTabs() {
  const [value, setValue] = React.useState("1");
  const [comment, setComment] = React.useState<string | undefined>("");
  const { id: floorPlanId } = useParams();
  const { data: floorPlanData } = useGetFloorPlanDetailsQuery(floorPlanId);
  const userName = localStorage.getItem("userName");
  const [updateFloorPlanRequest] = useUpdateFloorPlanRequestMutation();
  const [UpdateFloorPlanRequestStatus] = useUpdateFloorPlanRequestStatusMutation();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setComment(floorPlanData?._comment);
  }, [floorPlanData]);

  const updateComment = async () => {
    if (comment && comment !== "") {
      const data: UpdateFloorPlan = {
        id: floorPlanId,
        comment: comment,
        paymentTo: floorPlanData?._paymentTo,
        updatedBy: userName,
      };
      await updateFloorPlanRequest({
        updateFloorPlanData: data,
        step: FormStepEnum.COMPLETION,
      }).unwrap();
    }
  };

  const updateStatus = async (status: StatusTypeEnum) => {
    if (floorPlanId && status) {
      const data = {
        floorPlanId: floorPlanId ? floorPlanId : "",
        status,
      };
      await UpdateFloorPlanRequestStatus(data).unwrap();
    }
  };

  const handleAcceptClick = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div style={mainContainer}>
      <Typography
        sx={{
          height: 20,
          position: "fixed",
          top: 90,
          left: "86%",
        }}
      >
        Status:{" "}
        <span
          style={{
            textTransform: "capitalize",
            color:
              floorPlanData?._status === "pending"
                ? "#FF9900"
                : floorPlanData?._status === "approved"
                ? "#33C43B"
                : "#FF0B0B",
          }}
        >
          {floorPlanData?._status}
        </span>
      </Typography>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Floor Plan Request" />
        <div style={tabsContainer}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Vehicle Information" value="1" />
                  <Tab label="Sales Details" value="2" />
                  <Tab label="Payment Information" value="3" />
                  <Tab label="Uploaded Documents" value="4" />
                  {floorPlanData?._status === "approved" ? (
                    <Tab label="Loan Terms" value="5" />
                  ) : null}
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ padding: "20px 0px 0px 0px" }}>
                <VehicleInformationTab
                  vehicleData={floorPlanData?._vehicle}
                  comment={comment}
                  setComment={setComment}
                  handleSaveComment={updateComment}
                />
              </TabPanel>
              <TabPanel value="2">
                <SalesDetailsTab vehicleData={floorPlanData?._vehicle} />
              </TabPanel>
              <TabPanel value="3">
                <PaymentInformationTab floorPlanData={floorPlanData} />
              </TabPanel>
              <TabPanel value="4">
                <DocumentsListView vehicleId={floorPlanData?._vehicle._id} />
              </TabPanel>
              <TabPanel value="5">
                <LoanTermDetailsTab data={floorPlanData?._LoanTerms} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <div style={buttonContainer}>
          <ButtonComponent
            buttonName="Reject"
            buttonStyle={{
              color: "white",
              background:
                floorPlanData?._status === "approved" || floorPlanData?._status === "declined"
                  ? "#b3b7bf"
                  : "#FA1010",
              marginLeft: "10px",
            }}
            onClick={() => updateStatus(StatusTypeEnum.DECLINED)}
            disabled={
              floorPlanData?._status === "approved" || floorPlanData?._status === "declined"
            }
          />
          <ButtonComponent
            buttonName="Accept"
            buttonStyle={{
              color: "white",
              background: floorPlanData?._status === "approved" ? "#b3b7bf" : "#0AB2FA",
              marginLeft: "10px",
            }}
            onClick={handleAcceptClick}
            disabled={floorPlanData?._status === "approved"}
          />
        </div>
        <ApproveFloorPlanRequestModal
          open={openModal}
          handleClose={handleModalClose}
          floorPlanId={floorPlanId ? floorPlanId : ""}
        />
      </div>
    </div>
  );
}
