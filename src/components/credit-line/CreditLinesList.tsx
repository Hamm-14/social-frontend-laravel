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
import { useGetAllCreditLinesQuery } from "../../apis/creditLine";
import { useNavigate } from "react-router-dom";
import { CreditLine } from "../../types/creditLine";

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

const CreditLinesList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess } = useGetAllCreditLinesQuery("");
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (creditLineId: string) => {
    navigate(`/credit-line-application/${creditLineId}`);
  };

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Credit Line Application" />
        <div style={tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell align="center">Approved Amount</StyledTableCell>
                  <StyledTableCell align="center">Utilized Amount</StyledTableCell>
                  <StyledTableCell align="center">Application Id</StyledTableCell>
                </TableRow>
              </TableHead>
              {!isLoading && isSuccess && data.length > 0 && (
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : data
                  ).map((row: CreditLine) => (
                    <StyledTableRow
                      key={row._id}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewClick(row._id)}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{
                          color:
                            row._status === "pending"
                              ? "#FF9900"
                              : row._status === "approved"
                              ? "#33C43B"
                              : "#FF0B0B",
                          textTransform: "capitalize",
                        }}
                      >
                        {row._status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row._approvedAmount ? row._approvedAmount : 0}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row._utilizedCredit ? row._utilizedCredit : 0}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row._applicationId}</StyledTableCell>
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

export default CreditLinesList;
