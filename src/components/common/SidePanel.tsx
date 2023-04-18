import styled from "@emotion/styled";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutConfirmationModal from "./LogoutConfirmModal";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  flexDirection: "row",
}));

const bottomButtons: React.CSSProperties = {
  fontSize: 16,
  color: "#FFFFFF",
  marginTop: 4,
  marginBottom: 4,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

const drawerHeader: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "3% 3% 5% 3%",
};

const list: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const listItem: React.CSSProperties = {
  cursor: "pointer",
  color: "#FFFFFF",
};

const logo: React.CSSProperties = {
  width: 100,
  height: 50,
  cursor: "pointer",
  marginLeft: 10,
  marginTop: 10,
};

const bottomBoxContainer: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};
const bottomBox: React.CSSProperties = {
  position: "absolute",
  width: 260,
  height: 70,
  marginBottom: "7%",
  bottom: 0,
  padding: 0,
};

const dividerStyle: React.CSSProperties = {
  backgroundColor: "#0AB2FA",
  opacity: "0.1",
  width: "85%",
  left: "15px",
  position: "absolute",
};

const drawerStyle: React.CSSProperties = {
  width: "20%",
  backgroundColor: "#002F86",
  height: "96vh",
  marginTop: "1%",
  marginLeft: "1%",
  borderRadius: 15,
  overflow: "hidden",
};

const tabList = [
  {
    id: 0,
    route: "",
    title: "Floor Plan Request",
  },
  {
    id: 1,
    route: "business",
    title: "Business Information",
  },
  {
    id: 2,
    route: "users",
    title: "Users",
  },
  {
    id: 3,
    route: "customers",
    title: "Customers",
  },
  {
    id: 4,
    route: "credit-line-application",
    title: "Credit Line Application",
  },
];

const SidePanel: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getURLHash = (path: string) => {
    let hash = "";
    let slashCount = 0;
    for (let ch of path) {
      if (slashCount < 2) {
        if (ch === "/") {
          slashCount += 1;
        } else {
          hash = hash + ch;
        }
      }
    }
    if (hash === "floor-plan-request") {
      return "";
    }
    return hash;
  };

  const urlHash = getURLHash(location.pathname);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        open={true}
        PaperProps={{
          style: drawerStyle,
        }}
      >
        <DrawerHeader style={drawerHeader}>
          <img src={IMAGES.auto_debt_logo} alt="" style={logo} />
        </DrawerHeader>
        {/* <Divider
          sx={{ borderWidth: 1, marginTop: "4%", marginBottom: "2%", background: "#ECECEC" }}
        /> */}
        <List style={list}>
          <div>
            {tabList.map((data, index) => (
              <div key={index}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/${data.route}`,
                  }}
                >
                  <ListItem style={listItem}>
                    <span
                      style={{
                        fontSize: urlHash === data.route ? 20 : 16,
                        color: "#FFFFFF",
                        marginLeft: 8,
                        marginTop: 4,
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: urlHash === data.route ? 600 : 100,
                      }}
                    >
                      {data.title}
                    </span>
                  </ListItem>
                </Link>
                <Divider style={dividerStyle} />
              </div>
            ))}
          </div>
          <div style={bottomBoxContainer}>
            <div style={bottomBox}>
              <div style={{ marginBottom: 12 }}>
                <span style={bottomButtons} onClick={handleModalOpen}>
                  Logout &nbsp; <LogoutIcon />
                </span>
              </div>
              <div>
                <span style={bottomButtons}>
                  Settings &nbsp; <SettingsIcon />
                </span>
              </div>
            </div>
          </div>
        </List>
      </Drawer>
      <LogoutConfirmationModal
        handleClose={handleModalClose}
        open={openModal}
        handleLogout={logout}
      />
    </div>
  );
};

export default SidePanel;