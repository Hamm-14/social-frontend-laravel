import React from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import PostCard from "./PostCard";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const postContainer: React.CSSProperties = {
  // border: "1px solid red",
  width: "95%",
  height: "770px",
  marginTop: "100px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  zIndex: 0,
  overflow: "scroll",
};

const Feed = () => {
  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="News Feed" />
        <div style={postContainer} className="hide-scrollbar">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default Feed;
