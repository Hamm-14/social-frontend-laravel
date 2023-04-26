import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ButtonComponent from "../common/ButtonComponent";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 250,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleLogout: () => void;
};

const contentBox: React.CSSProperties = {
  width: "100%",
  height: "76%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function LogoutConfirmationModal(props: ModalProps) {
  const handleExit = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              padding: "1.5%",
              boxSizing: "border-box",
              borderBottom: "1px solid #C6C7CB",
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: "1.5rem",
                fontWeight: 600,
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              Confirm
            </Typography>
          </div>
          <div style={contentBox}>
            <Typography
              style={{
                margin: 8,
                fontSize: "1.5rem",
                fontWeight: 400,
                borderRadius: 10,
                padding: 15,
              }}
            >
              Are you sure you want to logout ?
            </Typography>
            <div>
              <ButtonComponent
                buttonName="Cancel"
                buttonStyle={{
                  color: "black",
                  background: "white",
                  fontFamily: "century_gothicregular",
                  margin: 15,
                  fontSize: "1rem",
                  border: "1px solid white",
                }}
                onClick={handleExit}
              />
              <ButtonComponent
                buttonName="Logout"
                buttonStyle={{
                  color: "white",
                  fontFamily: "century_gothicregular",
                  margin: 15,
                  fontSize: "1rem",
                }}
                onClick={props.handleLogout}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
