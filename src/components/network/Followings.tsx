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

const typoStyle: React.CSSProperties = {
  color: "#002F86",
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: "15px",
  letterSpacing: 0.5,
};

const Followings = (props: any) => {
  const { data, handleUnFollowClick, buttonLoading } = props;
  
  return (
    <div style={{ width: "30%" }}>
      <Typography style={typoStyle}>Followings</Typography>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.map((user: any, index: number) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem
              key={index}
              secondaryAction={
                <ButtonComponent
                  buttonName="Unfollow"
                  onClick={() => handleUnFollowClick(user.following.id)}
                  buttonStyle={{ fontSize: 12, color: "white" }}
                  isLoading={buttonLoading === user.following.id}
                />
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={"user-avatar"}
                    src={
                      user.following.avatar
                        ? `http://127.0.0.1:8080/${user.following.avatar}`
                        : IMAGES.profile_pic
                    }
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={user.following.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Followings;
