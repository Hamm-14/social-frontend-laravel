import { Box, CircularProgress, InputLabel, Typography } from "@mui/material";
import React from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../common/InputField";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetUserQuery } from "../../apis/user";
import { IMAGES } from "../../assets";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#002F86",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
  marginBottom: 20,
};

const noRecordDiv: React.CSSProperties = {
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: 3,
  fontWeight: 600,
};

const typoStyle: React.CSSProperties = { color: "#002F86", fontWeight: 600, marginBottom: "15px" };

const CustomerDetailView = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { data, isLoading, isSuccess } = useGetUserQuery(userId);

  const handleBusinessViewClick = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <Header title="Customer" />
      <div style={{ width: "80%", marginTop: "5%" }}>
        <div style={{ height: 600, overflow: "scroll", marginTop: 20 }} className="hide-scrollbar">
          <div style={contentDivs}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <div style={{ width: "48%", marginBottom: "15px" }}>
                <InputLabel style={inputLabel}>First Name</InputLabel>
                <InputField size="small" style={inputField} value={data?._firstName} disabled />
              </div>
              <div style={{ width: "48%", marginBottom: "15px" }}>
                <InputLabel style={inputLabel}>Last Name</InputLabel>
                <InputField size="small" style={inputField} value={data?._lastName} disabled />
              </div>
              <div style={{ width: "48%" }}>
                <InputLabel style={inputLabel}>Email Address</InputLabel>
                <InputField size="small" style={inputField} value={data?._email} disabled />
              </div>
              <div style={{ width: "48%" }}>
                <InputLabel style={inputLabel}>Phone Number</InputLabel>
                <InputField size="small" style={inputField} value={data?._mobileNumber} disabled />
              </div>
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Businesses List</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Business Name</StyledTableCell>
                      <StyledTableCell align="center">Business Phone</StyledTableCell>
                      <StyledTableCell align="center">Dealer License</StyledTableCell>
                      <StyledTableCell align="center">Business City</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {!isLoading && isSuccess && data._businesses.length > 0 && (
                    <TableBody>
                      {data?._businesses.map((row, index) => (
                        <StyledTableRow key={index} style={{ cursor: "pointer" }}>
                          <StyledTableCell component="th" scope="row">
                            {row._businessName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row._businessPhoneNumber}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row._isDealerLicense ? "Yes" : "No"}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row._city}</StyledTableCell>
                          <StyledTableCell align="center">
                            <img
                              src={IMAGES.view_icon}
                              alt="accept-icon"
                              style={{ padding: "0px 5px 0px 5px" }}
                              onClick={() => handleBusinessViewClick(row._id)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {!isLoading && data?._businesses.length === 0 && (
                <Box sx={noRecordDiv}>
                  <Box>No Record Found</Box>
                </Box>
              )}
              {isLoading && (
                <Box sx={noRecordDiv}>
                  <Box>
                    <CircularProgress size={30} />
                  </Box>
                </Box>
              )}
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Vehicle List</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Model</StyledTableCell>
                      <StyledTableCell align="center">MMR Value</StyledTableCell>
                      <StyledTableCell align="center">Color</StyledTableCell>
                      <StyledTableCell align="center">VIN</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {!isLoading && isSuccess && data._vehicles.length > 0 && (
                    <TableBody>
                      {data?._vehicles.map((row, index) => (
                        <StyledTableRow key={index} style={{ cursor: "pointer" }}>
                          <StyledTableCell component="th" scope="row">
                            {row._modelName}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row._mmrValue}</StyledTableCell>
                          <StyledTableCell align="center">{row._color}</StyledTableCell>
                          <StyledTableCell align="center">{row._vin}</StyledTableCell>
                          <StyledTableCell align="center">
                            <img
                              src={IMAGES.view_icon}
                              alt="accept-icon"
                              style={{ padding: "0px 5px 0px 5px" }}
                              //onClick={() => handleViewClick(row._id)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {!isLoading && data?._vehicles.length === 0 && (
                <Box sx={noRecordDiv}>
                  <Box>No Record Found</Box>
                </Box>
              )}
              {isLoading && (
                <Box sx={noRecordDiv}>
                  <Box>
                    <CircularProgress size={30} />
                  </Box>
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailView;
