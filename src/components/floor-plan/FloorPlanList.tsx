import {
  Box,
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import { useGetAllFloorPlansQuery } from "../../apis/floorPlan";
import { GetFloorPlan } from "../../types/floorPlan";
import { useNavigate } from "react-router-dom";

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
  // background: "#F5F6F8",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const tableContainer: React.CSSProperties = {
  width: "95%",
  padding: "2% 0% 5% 0%",
  marginTop: "6%",
};

const noRecordDiv: React.CSSProperties = {
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: 5,
  marginBottom: 20,
  fontWeight: 600,
  backgroundColor: "#F5F6F8",
};

const FloorPlanList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess } = useGetAllFloorPlansQuery("");
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (floorPlanRequestId: string) => {
    navigate(`/floor-plan-request/${floorPlanRequestId}`);
  };

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Floor Plan Request" />
        <div style={tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Model</StyledTableCell>
                  <StyledTableCell>MMR Value</StyledTableCell>
                  <StyledTableCell align="center">Color</StyledTableCell>
                  <StyledTableCell align="center">VIN</StyledTableCell>
                </TableRow>
              </TableHead>
              {!isLoading && isSuccess && data.length > 0 && (
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : data
                  ).map((row: GetFloorPlan) => (
                    <StyledTableRow
                      key={row._id}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewClick(row._id)}
                    >
                      <StyledTableCell
                        style={{
                          textTransform: "capitalize",
                          color:
                            row._status === "pending"
                              ? "#FF9900"
                              : row._status === "approved"
                              ? "#33C43B"
                              : "#FF0B0B",
                        }}
                      >
                        {row._status}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row._vehicle._modelName}
                      </StyledTableCell>
                      <StyledTableCell>{row._vehicle._mmrValue}</StyledTableCell>
                      <StyledTableCell align="center">{row._vehicle._color}</StyledTableCell>
                      <StyledTableCell align="center">{row._vehicle._vin}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {!isLoading && data?.length === 0 && (
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
          {!isLoading && isSuccess && data.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FloorPlanList;
