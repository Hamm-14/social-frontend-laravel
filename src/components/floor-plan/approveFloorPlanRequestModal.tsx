import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "../common/InputField";
import ButtonComponent from "../common/ButtonComponent";
import { StatusTypeEnum } from "../../types/creditLine";
import { useState } from "react";
import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import {
  useCreateLoanTermsForApprovingCreditLineMutation,
  useUpdateFloorPlanRequestStatusMutation,
} from "../../apis/floorPlan";

const style = {
  position: "absolute" as "absolute",
  top: "48%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 450,
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
  floorPlanId: string;
};

const contentBox: React.CSSProperties = {
  margin: "2rem",
};

const detailsContainer: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  height: "150px",
  justifyContent: "space-between",
  margin: "10px",
};

const inputLabel: React.CSSProperties = {
  color: "black",
  marginBottom: "10px",
};

const inputField: React.CSSProperties = {
  background: "#F5F6F8",
  width: "100%",
};

// const selectContainer: React.CSSProperties = {
//   background: "#F5F6F8",
//   width: "100%",
//   alignSelf: "center",
// };
const selectContainerAlt: React.CSSProperties = {
  alignSelf: "center",
  width: "100%",
};

interface Entity {
  title: string;
  value: string;
}

const amortizationData = [{ title: "Monthly", value: "monthly" }];

var modeOfPayments = [
  { title: "Online", value: "online" },
  { title: "Offline", value: "offline" },
];

const loanTerms = [
  { title: "6", value: "6" },
  { title: "12", value: "12" },
  { title: "18", value: "18" },
  { title: "24", value: "24" },
  { title: "30", value: "30" },
  { title: "36", value: "36" },
  { title: "42", value: "42" },
  { title: "48", value: "48" },
  { title: "54", value: "54" },
  { title: "60", value: "60" },
  { title: "66", value: "66" },
  { title: "72", value: "72" },
  { title: "78", value: "78" },
  { title: "84", value: "84" },
];

export default function ApproveFloorPlanRequestModal(props: ModalProps) {
  const userName = localStorage.getItem("userName");
  const [inputErrorInterestRate, setInputErrorInterestRate] = useState<boolean>(false);
  const [inputErrorLoanAmount, setInputErrorLoanAmount] = useState<boolean>(false);
  const [createLoanTerms] = useCreateLoanTermsForApprovingCreditLineMutation();
  const [updateStatus] = useUpdateFloorPlanRequestStatusMutation();
  const ModeOfPaymentData: Entity[] = modeOfPayments;
  const AmortizationData: Entity[] = amortizationData;
  const LoanTermData: Entity[] = loanTerms;
  const initialValues = {
    approvedLoanAmount: "",
    loanTerm: "",
    amortization: "",
    interestRate: "",
    modeOfPayment: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const onHandleChange = (event: any) => {
    let value: boolean | string = event.target.value;
    if (event.target.name === "approvedLoanAmount") {
      console.log(value);
      if (Number.isNaN(value) || value === "") {
        setInputErrorLoanAmount(true);
      } else {
        setInputErrorLoanAmount(false);
      }
    }
    if (event.target.name === "interestRate") {
      if (Number.isNaN(value) || value === "") {
        setInputErrorInterestRate(true);
      } else {
        setInputErrorInterestRate(false);
      }
    }
    setFormValues({ ...formValues, [event.target.name]: value });
  };

  React.useEffect(() => {
    formValues.amortization = AmortizationData[0]?.value;
    formValues.loanTerm = LoanTermData[0]?.value;
    formValues.modeOfPayment = ModeOfPaymentData[0]?.value;
  }, []);

  const createLoanTermsFunc = async () => {
    const data = {
      floorPlanId: props.floorPlanId,
      loanTermsData: {
        createdBy: userName,
        updatedBy: userName,
        approvedLoanAmount: parseInt(formValues.approvedLoanAmount),
        loanTerm: formValues.loanTerm,
        amortization: formValues.amortization,
        interestRate: parseInt(formValues.interestRate),
        modeOfPayment: formValues.modeOfPayment,
      },
    };
    const resp: any = await createLoanTerms(data);
    if (resp) {
      const updateData = {
        floorPlanId: props.floorPlanId,
        status: StatusTypeEnum.APPROVED,
      };
      const resp: any = await updateStatus(updateData);
      if (resp) {
        props.handleClose();
      }
    }
  };

  const handleSubmit = async () => {
    if (formValues.interestRate === "") {
      setInputErrorInterestRate(true);
    } else {
      setInputErrorInterestRate(false);
    }
    if (formValues.approvedLoanAmount === "") {
      setInputErrorLoanAmount(true);
    } else {
      setInputErrorLoanAmount(false);
    }
    if (formValues.interestRate !== "" && formValues.approvedLoanAmount !== "") {
      createLoanTermsFunc();
      props.handleClose();
    }
  };

  const handleExit = () => {
    setInputErrorInterestRate(false);
    setInputErrorLoanAmount(false);
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
            <div style={detailsContainer}>
              <div style={{ width: "48%", marginBottom: "1rem" }}>
                <InputLabel sx={inputLabel}>Approved Loan Amount</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  type="number"
                  label=""
                  placeholder="Enter Amount"
                  name="approvedLoanAmount"
                  onChange={onHandleChange}
                  value={formValues.approvedLoanAmount}
                  disabled={false}
                  error={inputErrorLoanAmount}
                />
              </div>
              <div style={{ width: "48%", marginBottom: "1rem" }}>
                <InputLabel sx={inputLabel}>Loan Term</InputLabel>
                <FormControl style={selectContainerAlt}>
                  <Select
                    label=""
                    name="loanTerm"
                    size="small"
                    value={formValues.loanTerm}
                    onChange={onHandleChange}
                    defaultValue={LoanTermData[0].value}
                  >
                    {LoanTermData?.map((data, index) => {
                      return (
                        <MenuItem key={index} value={`${data.value}`}>
                          {data.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "48%", marginBottom: "1rem" }}>
                <InputLabel sx={inputLabel}>Amortization</InputLabel>
                <FormControl style={selectContainerAlt}>
                  <Select
                    label=""
                    name="amortization"
                    size="small"
                    value={formValues.amortization}
                    defaultValue={AmortizationData[0].value}
                    onChange={onHandleChange}
                  >
                    {AmortizationData?.map((data, index) => {
                      return (
                        <MenuItem key={index} value={`${data.value}`}>
                          {data.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "48%", marginBottom: "1rem" }}>
                <InputLabel sx={inputLabel}>Static Interest Rate On Requested Amount</InputLabel>
                <InputField
                  size="small"
                  style={inputField}
                  type="number"
                  label=""
                  placeholder="Enter interest rate"
                  name="interestRate"
                  onChange={onHandleChange}
                  value={formValues.interestRate}
                  disabled={false}
                  error={inputErrorInterestRate}
                />
              </div>
              <div style={{ width: "48%", marginBottom: "1rem" }}>
                <InputLabel sx={inputLabel}>Mode of Payments </InputLabel>
                <FormControl style={selectContainerAlt}>
                  <Select
                    label=""
                    name="modeOfPayment"
                    size="small"
                    value={formValues.modeOfPayment}
                    onChange={onHandleChange}
                    defaultValue={ModeOfPaymentData[0]?.title}
                  >
                    {ModeOfPaymentData?.map((data, index) => {
                      return (
                        <MenuItem key={index} value={`${data.value}`}>
                          {data.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
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
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
