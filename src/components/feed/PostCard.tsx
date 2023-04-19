import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputField from "../common/InputField";
import ButtonComponent from "../common/ButtonComponent";
import CommentCard from "./CommentCard";
import { useLikePostMutation } from "../../apis/post";
import { useCreateCommentMutation } from "../../apis/comment";
import { IMAGES } from "../../assets";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(postCardData: any) {
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [isPostLiked, setIsPostLiked] = React.useState(false);
  const userId = localStorage.getItem("userId");
  const { postCardData: postData } = postCardData;
  const [likePost] = useLikePostMutation();
  const [createComment] = useCreateCommentMutation();

  React.useEffect(() => {
    verifyPostAlreadyLiked();
  }, [postData]);

  const verifyPostAlreadyLiked = () => {
    postData?.post_likes.map((postLike: any) => {
      if (postLike.user_id == userId) {
        setIsPostLiked(true);
        return;
      }
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getFormattedDate = (rawDate: string) => {
    const d1 = new Date(rawDate);
    return d1.toDateString();
  };

  const handleToggleLike = async () => {
    const data: any = {
      userId: userId,
      postId: postData.id,
    };
    const resp: any = await likePost(data).unwrap();
    if (resp) {
      isPostLiked ? setIsPostLiked(false) : setIsPostLiked(true);
    }
  };

  const handleCommentInput = (event: any) => {
    setComment(event.target.value);
  };

  const handleCommentSend = async () => {
    const data = {
        description: comment,
        userId: userId,
        postId: postData.id
    };
    const resp: any = await createComment(data).unwrap();
    if(resp){
        setComment('');
    }
  };

  console.log('post user avarat', postData?.user.avatar);
  return (
    <Card sx={{ width: 345, margin: 4, height: expanded ? 640 : 380 }}>
      <CardHeader
        avatar={
          <img
            src={postData?.user.avatar ? `http://127.0.0.1:8080/${postData?.user.avatar}` : IMAGES.profile_pic}
            style={{ width: 50, height: 45, borderRadius: "50%" }}
            alt="profile"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postData?.user?.name}
        subheader={getFormattedDate(postData?.created_at)}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://127.0.0.1:8081/${postData?.post_pic}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postData?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleToggleLike}>
          {isPostLiked ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
          <span style={{ fontSize: 20, marginLeft: 5 }}>
            {postData.post_likes.length}
          </span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{ overflow: "scroll", height: 200 }}
          className="hide-scrollbar"
        >
          <div style={{ width: "100%" }}>
            <InputField
              placeholder="Type a comment..."
              size="small"
              sx={{ width: "75%", marginRight: 1 }}
              value={comment}
              onChange={handleCommentInput}
            />
            <ButtonComponent
              buttonName="Send"
              buttonStyle={{ color: "white" }}
              onClick={handleCommentSend}
            />
          </div>
          {postData?.comments.map((comment: any) => {
            return <CommentCard commentCardData={comment} key={comment.id} />;
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
