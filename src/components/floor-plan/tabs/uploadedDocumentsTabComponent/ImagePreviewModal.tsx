import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ButtonComponent from "../../../common/ButtonComponent";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

type ModalProps = {
  fileURL: string;
  handleClose: () => void;
  open: boolean;
};

const contentBox: React.CSSProperties = {
  width: "100%",
  height: "87%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#F5F6F8",
};

export default function ImagePreviewModal(props: ModalProps) {
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
              height: "13%",
              background: "#002F86",
              padding: "2%",
              boxSizing: "border-box",
            }}
          >
            <Typography sx={{ color: "white", fontSize: "1.5rem", textAlign: "center" }}>
              Preview
            </Typography>
          </div>
          <div style={contentBox}>
            <div
              style={{
                width: "90%",
                height: "100%",
                background: "white",
                borderRadius: "10px",
                marginTop: "35px",
              }}
            >
              <img
                src={props.fileURL}
                alt="preview"
                width="90%"
                height="90%"
                style={{ margin: "4%" }}
              />
            </div>
            <div>
              <ButtonComponent
                buttonName="Exit"
                buttonStyle={{
                  color: "white",
                  background: "#0AB2FA",
                  fontFamily: "century_gothicregular",
                  margin: 15,
                  fontSize: "1.2rem",
                }}
                onClick={handleExit}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
