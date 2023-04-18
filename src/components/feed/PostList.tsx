import React from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const Feed = () => {

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="News Feed" />
      </div>
    </div>
  );
};

export default Feed;
