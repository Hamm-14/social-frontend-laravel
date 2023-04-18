import { InputLabel, Typography } from "@mui/material";
import React from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import { useParams } from "react-router-dom";
import InputField from "../common/InputField";
import Checkbox from "@mui/material/Checkbox";
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

const typoStyle: React.CSSProperties = { color: "#002F86", fontWeight: 600, marginBottom: "15px" };

const rows = [
  {
    title: "Existing Record",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
  {
    title: "Newly Added Data",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
  {
    title: "Payments Record",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
  {
    title: "Customer Info",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
  {
    title: "Credit Line Amount",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
  {
    title: "Vehicle Information",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
  {
    title: "Documents",
    edit: <Checkbox defaultChecked size="small" />,
    delete: <Checkbox defaultChecked size="small" />,
    update: <Checkbox defaultChecked size="small" />,
    download: <Checkbox defaultChecked size="small" />,
  },
];

const UserDetailView = () => {
  const { id: userId } = useParams();
  const { data } = useGetUserQuery(userId);

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <Header title="User" />
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
            <Typography style={typoStyle}>Permissions List</Typography>
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
                      <StyledTableCell>Title</StyledTableCell>
                      <StyledTableCell align="center">Edit</StyledTableCell>
                      <StyledTableCell align="center">Delete</StyledTableCell>
                      <StyledTableCell align="center">Update</StyledTableCell>
                      <StyledTableCell align="center">Download</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <StyledTableRow key={index} style={{ cursor: "pointer" }}>
                        <StyledTableCell component="th" scope="row">
                          {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.edit}</StyledTableCell>
                        <StyledTableCell align="center">{row.update}</StyledTableCell>
                        <StyledTableCell align="center">{row.delete}</StyledTableCell>
                        <StyledTableCell align="center">{row.download}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailView;
