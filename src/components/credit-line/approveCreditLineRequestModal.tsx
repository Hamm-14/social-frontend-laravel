import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "../common/InputField";
import ButtonComponent from "../common/ButtonComponent";
import { StatusTypeEnum } from "../../types/creditLine";
import { useState } from "react";
import { useUpdateCreditLineApplicationStatusMutation } from "../../apis/creditLine";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
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
  creditLineId: string | undefined;
};

const contentBox: React.CSSProperties = {
  width: "100%",
  height: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function ApproveCreditLineRequestModal(props: ModalProps) {
  const [amount, setAmount] = useState<any>();
  const [UpdateCreditLineApplicationStatus] = useUpdateCreditLineApplicationStatusMutation();
  const [inputError, setInputError] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let amountInNumber = Number(event.target.value);
    if (Number.isNaN(amountInNumber)) {
      setInputError(true);
      setAmount(event.target.value);
    } else {
      setInputError(false);
      setAmount(Number(event.target.value));
    }
  };

  const handleSubmit = async () => {
    if (!inputError) {
      const data = {
        applicationId: props.creditLineId ? props.creditLineId : "",
        approvedAmount: amount,
        status: StatusTypeEnum.APPROVED,
      };
      const res: any = await UpdateCreditLineApplicationStatus(data).unwrap();
      if (res) {
        setAmount("");
        props.handleClose();
      }
    }
  };

  const handleExit = () => {
    setAmount("");
    setInputError(false);
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
              height: "15%",
              background: "#002F86",
              padding: "2%",
              boxSizing: "border-box",
            }}
          >
            <Typography sx={{ color: "white", fontSize: "1.5rem", textAlign: "center" }}>
              Approve Credit Line
            </Typography>
          </div>
          <div style={contentBox}>
            <div style={{ width: "80%" }}>
              <Typography style={{ marginBottom: "4px", fontSize: "1.4rem" }}>
                Amount to approve
              </Typography>
              <InputField
                sx={{ width: "100%", background: "#F3F9FE" }}
                value={amount}
                onChange={handleInputChange}
                error={inputError}
              />
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  buttonName="Exit"
                  buttonStyle={{
                    color: "white",
                    background: "#0AB2FA",
                    fontFamily: "century_gothicregular",
                    margin: "15px 15px 0px 0px",
                    fontSize: "1.2rem",
                  }}
                  onClick={handleExit}
                />
                <ButtonComponent
                  buttonName="Submit"
                  buttonStyle={{
                    color: "white",
                    fontFamily: "century_gothicregular",
                    margin: "15px 15px 0px 0px",
                    fontSize: "1.2rem",
                  }}
                  onClick={handleSubmit}
                  disabled={!amount}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
