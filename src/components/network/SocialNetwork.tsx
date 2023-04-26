import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import AllUsers from "./AllUsers";
import Followers from "./Followers";
import Followings from "./Followings";
import { useAllUsersQuery } from "../../apis/user";
import {
  useAllFollowersMutation,
  useAllFollowingsMutation,
  useFollowMutation,
  useUnFollowMutation,
} from "../../apis/friendship";
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

const cardsContainer: React.CSSProperties = {
  width: "95%",
  height: 500,
  marginTop: "8%",
  display: "flex",
  justifyContent: "space-between",
};

const noRecordDiv: React.CSSProperties = {
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: '12%',
  marginBottom: 20,
  fontWeight: 600,
  backgroundColor: "#F5F6F8",
};

const SocialNetwork = () => {
  const userId = localStorage.getItem("userId");
  const [allFollowers, setAllFollowers] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const[buttonLoading, setButtonLoading] = React.useState(null);
  const [usersToFollow, setUsersToFollow] = React.useState<any>([]);
  const [allFollowings, setAllFollowings] = React.useState<any>([]);
  const { data: allUsers } = useAllUsersQuery("");
  const [getAllFollowers] = useAllFollowersMutation();
  const [getAllFollowings] = useAllFollowingsMutation();
  const [followUser] = useFollowMutation();
  const [UnfollowUser] = useUnFollowMutation();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (allUsers) {
      fetchAllFollowers();
      fetchAllFollowings();
    }
  }, [allUsers]);

  useEffect(() => {
    const users = getUsersToFollow();
    setUsersToFollow(users);
  }, [allFollowers, allFollowings, allFollowers]);

  const fetchAllFollowers = async () => {
    const data = {
      userId: Number(userId),
    };
    const resp = await getAllFollowers(data).unwrap();
    if (resp) {
      setAllFollowers(resp.data);
    }
  };

  const fetchAllFollowings = async () => {
    const data = {
      userId: Number(userId),
    };
    const resp = await getAllFollowings(data).unwrap();
    if (resp) {
      setAllFollowings(resp.data);
    }
  };

  const handleFollowClick = async (userToFollow: any) => {
    setButtonLoading(userToFollow);
    const data = {
      from_user: userId,
      to_user: userToFollow,
    };
    const resp = await followUser(data).unwrap();
    if (resp) {
      await fetchAllFollowers();
      await fetchAllFollowings();
      let users = getUsersToFollow();
      setUsersToFollow(users);
      setButtonLoading(null);
    }
  };

  const handleUnFollowClick = async (userToUnFollow: any) => {
    setButtonLoading(userToUnFollow);
    const data = {
      from_user: Number(userId),
      to_user: userToUnFollow,
    };
    const resp = await UnfollowUser(data).unwrap();
    if (resp) {
      await fetchAllFollowers();
      await fetchAllFollowings();
      let users = getUsersToFollow();
      setUsersToFollow(users);
      setButtonLoading(null);
    }
  };

  const getUsersToFollow = () => {
    let users: any = [];
    allUsers?.data.map((user: any) => {
      let isAlreadyFollowing = false;
      allFollowings.map((following: any) => {
        if (following.following.id === user.id) {
          isAlreadyFollowing = true;
        }
      });
      if (!isAlreadyFollowing && userId != user.id) {
        users.push(user);
      }
    });
    return users;
  };

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Social Network" />
        {isLoading ? (
          <Box sx={noRecordDiv}>
            <Box>
              <CircularProgress size={30} />
            </Box>
          </Box>
        ) : (
          <div style={cardsContainer}>
            <AllUsers
              usersToFollow={usersToFollow}
              handleFollowClick={handleFollowClick}
              buttonLoading={buttonLoading}
            />
            <Followers data={allFollowers} />
            <Followings
              data={allFollowings}
              handleUnFollowClick={handleUnFollowClick}
              buttonLoading={buttonLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialNetwork;
