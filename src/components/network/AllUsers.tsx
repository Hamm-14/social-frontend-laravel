import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ButtonComponent from "../common/ButtonComponent";
import { IMAGES } from "../../assets";
import { useEffect, useState } from "react";
import { useFollowMutation } from "../../apis/friendship";

const typoStyle: React.CSSProperties = {
  color: "#002F86",
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: "15px",
  letterSpacing: 0.5,
};

const AllUsers = (props: any) => {
  const { allUsers, allFollowings } = props;
  const [usersToFollow, setUsersToFollow] = useState<any>([]);
  //   const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const [followUser] = useFollowMutation();

  useEffect(() => {
    let users = getUsersToFollow();
    setUsersToFollow(users);
  }, [allUsers, allFollowings]);

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

  const handleFollowClick = async (userToFollow: any) => {
    const data = {
      from_user: userId,
      to_user: userToFollow,
    };
    const resp = await followUser(data).unwrap();
    if(resp) {
        window.location.replace('social-network');
    }
  };

  console.log("all_users", allUsers);
  console.log("all_followings", allFollowings);
  console.log("users_to_follow", usersToFollow);
  return (
    <div style={{ width: "30%" }}>
      <Typography style={typoStyle}>Users</Typography>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {usersToFollow.map((user: any, index: number) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem
              key={index}
              secondaryAction={
                <ButtonComponent
                  buttonName="Follow"
                  buttonStyle={{ fontSize: 12, color: "white" }}
                  onClick={() => handleFollowClick(user.id)}
                />
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={"user-avatar"}
                    src={
                      user.avatar
                        ? `http://127.0.0.1:8080/${user.avatar}`
                        : IMAGES.profile_pic
                    }
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={user.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default AllUsers;
