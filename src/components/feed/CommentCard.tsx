import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { useLikeCommentMutation } from "../../apis/comment";
import { IMAGES } from "../../assets";

export default function CommentCard(commentCardData: any) {
  const [isCommentLiked, setIsCommentLiked] = React.useState(false);
  const userId = localStorage.getItem("userId");
  const { commentCardData: commentData } = commentCardData;
  const [likeComment] = useLikeCommentMutation();

  React.useEffect(() => {
    verifyPostAlreadyLiked();
  }, [commentData]);

  const verifyPostAlreadyLiked = () => {
    commentData?.comment_likes.map((commentLike: any) => {
      if (commentLike.user_id == userId) {
        setIsCommentLiked(true);
        return;
      }
    });
  };

  const handleToggleLike = async () => {
    const data: any = {
        userId: userId,
        commentId: commentData.id,
      };
      const resp: any = await likeComment(data).unwrap();
      if(resp) {
        isCommentLiked ? setIsCommentLiked(false) : setIsCommentLiked(true);
      }
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardHeader
        avatar={
          <img
            src={commentData?.user.avatar ? `http://127.0.0.1:8080/${commentData?.user.avatar}` : IMAGES.profile_pic}
            style={{ width: 50, height: 45, borderRadius: "50%" }}
            alt="profile"
          />
        }
        title={commentData?.user.name}
        subheader={commentData?.description}
      />
      <IconButton aria-label="add to favorites" onClick={handleToggleLike}>
        {isCommentLiked ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
        <span style={{ fontSize: 20, marginLeft: 5 }}>
          {commentData.comment_likes.length}
        </span>
      </IconButton>
    </Card>
  );
}
