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
import { useFollowMutation } from "../../apis/friendship";

const typoStyle: React.CSSProperties = {
  color: "#002F86",
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: "15px",
  letterSpacing: 0.5,
};

const AllUsers = (props: any) => {
  const { usersToFollow, handleFollowClick, buttonLoading } = props;

  return (
    <div style={{ width: "30%" }}>
      <Typography style={typoStyle}>Users To Follow</Typography>
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
                  isLoading={buttonLoading === user.id}
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
