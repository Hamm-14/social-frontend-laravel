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
import { useUnFollowMutation } from "../../apis/friendship";

const typoStyle: React.CSSProperties = {
  color: "#002F86",
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: "15px",
  letterSpacing: 0.5,
};

const Followings = (props: any) => {
  const { data } = props;
  const [UnfollowUser] = useUnFollowMutation();
  const userId = localStorage.getItem("userId");

  const handleUnFollowClick = async (userToUnFollow: any) => {
    const data = {
      from_user: Number(userId),
      to_user: userToUnFollow,
    };
    const resp = await UnfollowUser(data).unwrap();
    if(resp) {
        window.location.replace('social-network');
    }
  };
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
