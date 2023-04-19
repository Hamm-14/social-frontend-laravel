import React from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import PostCard from "./PostCard";
import { useGetAllPostsQuery } from "../../apis/post";
import { Box, CircularProgress } from "@mui/material";

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
  width: "95%",
  height: "770px",
  marginTop: "100px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  overflow: "scroll",
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

const Feed = () => {
  const { data, isLoading, isSuccess } = useGetAllPostsQuery("");
  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="News Feed" />
        <div style={postContainer} className="hide-scrollbar">
          {isSuccess && data?.data?.length > 0 && data.data.map((post: any) => {
            return <PostCard postCardData={post} key={post.id}/>
          })}
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
        </div>
      </div>
    </div>
  );
};

export default Feed;
