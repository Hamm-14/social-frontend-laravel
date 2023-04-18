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
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { VehicleFiles } from "../../../../types/documents";
import { useGetVehicleDocumentsQuery } from "../../../../apis/documents";
import ImagePreviewModal from "./ImagePreviewModal";

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

const tableContainer: React.CSSProperties = {
  width: "100%",
};

const noRecordDiv: React.CSSProperties = {
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: 5,
  marginBottom: 20,
  fontWeight: 600,
  backgroundColor: "#FFFFFF",
};

type DocumentsListProps = {
  vehicleId: string | undefined;
};

const DocumentsListView = (props: DocumentsListProps) => {
  const { vehicleId } = props;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [clickedFileURL, setClickedFileURL] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, isLoading, isSuccess } = useGetVehicleDocumentsQuery(vehicleId);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleImageClick = (fileURL: string) => {
    setClickedFileURL(fileURL);
    setOpenModal(true);
  };

  return (
    <div>
      <div style={tableContainer}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>File Name</StyledTableCell>
                <StyledTableCell>File Type</StyledTableCell>
                <StyledTableCell align="center">Preview</StyledTableCell>
              </TableRow>
            </TableHead>
            {!isLoading && isSuccess && data.length > 0 && (
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row: VehicleFiles) => (
                  <StyledTableRow key={row._id} style={{ cursor: "pointer" }}>
                    <StyledTableCell>{row._fileName}</StyledTableCell>
                    <StyledTableCell sx={{ textTransform: "capitalize" }}>
                      {row._type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Tooltip title="Open" placement="right">
                        <img
                          src={row._fileUrl}
                          alt="file-preview"
                          height={40}
                          width={70}
                          onClick={() => handleImageClick(row._fileUrl)}
                        />
                      </Tooltip>
                    </StyledTableCell>
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
      <ImagePreviewModal open={openModal} handleClose={handleModalClose} fileURL={clickedFileURL} />
    </div>
  );
};

export default DocumentsListView;
