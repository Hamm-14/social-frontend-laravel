import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import AllUsers from "./AllUsers";
import Followers from "./Followers";
import Followings from "./Followings";
import { useAllUsersQuery } from "../../apis/user";
import { useAllFollowersMutation, useAllFollowingsMutation } from "../../apis/friendship";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const cardsContainer: React.CSSProperties = {
  width: "95%",
  height: 500,
  marginTop: "8%",
  display: "flex",
  justifyContent: "space-between",
};



const SocialNetwork = () => {
  const userId = localStorage.getItem("userId");
  const [allFollowers, setAllFollowers] = React.useState<any>([]);
  const [allFollowings, setAllFollowings] = React.useState<any>([]);
  const { data: allUsers } = useAllUsersQuery("");
  const [getAllFollowers] = useAllFollowersMutation();
  const [getAllFollowings] = useAllFollowingsMutation();

  useEffect(() => {
    if(allUsers) {
        fetchAllFollowers();
        fetchAllFollowings();
    }
  }, [allUsers]);

//   useEffect(() => {
//     const users = getUsersToFollow();
//     setUsersToFollow(users);
//   },[allFollowers, allFollowings, allFollowers]);

  const fetchAllFollowers = async () => {
    const data = {
        userId: Number(userId),
    }
    const resp = await getAllFollowers(data).unwrap();
    if(resp){
        setAllFollowers(resp.data);
    }
  }

  const fetchAllFollowings = async () => {
    const data = {
        userId: Number(userId),
    }
    const resp = await getAllFollowings(data).unwrap();
    if(resp){
        setAllFollowings(resp.data);
    }
  }

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Social Network" />
        <div style={cardsContainer}>
          <AllUsers allUsers={allUsers} allFollowings={allFollowings}/>
          <Followers data={allFollowers}/>
          <Followings data={allFollowings}/>
        </div>
      </div>
    </div>
  );
};

export default SocialNetwork;
