import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardMedia, IconButton, styled, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
import SendIcon from "@mui/icons-material/Send";
import { useUserContext } from "../context/userContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostCard({ post, user, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const { currentUser } = useUserContext(); //get current user from userContext.

  //Check if user is logged in:
  /* useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);*/

  const handleViewDetails = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!comment) setComment(true);
  };

  useEffect(() => {
    if (expanded) {
      axios
        .get(`api/comment/${post.id}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Failed to load Comments", err));
    }
  }, [expanded, post.id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = {
        userId: currentUser.id,
        postId: post.id,
        comment: comment.trim(),
      };
      const response = await axios.post("/api/comment/create", newComment);
      setComments((prev) => [...prev, response.data]); //add the new comment into the comments list.
      setComment(""); //reset comment
    } catch (error) {
      console.error("Error, could not submit comment: ", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 300 }}>
      <Card variant="outlined">
        <React.Fragment>
          {/* Post Content: */}
          <CardContent>
            {post.image && <CardMedia component="img" height={140} image={post.image} alt={post.title} />}
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {post.category}
            </Typography>
            <Typography variant="h5" component="div">
              Title: {post.title}
            </Typography>
            <Typography variant="body2">{post.content}</Typography>
          </CardContent>
          {/* Comment Insert:: */}
          <Box>
            <TextField
              label="Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)} //CHECK
            />
            <IconButton onClick={handleCommentSubmit}>
              <SendIcon />
            </IconButton>
          </Box>
          {/* Buttons: */}
          <CardActions>
            <Button size="small" onClick={handleViewDetails}>
              Read
            </Button>
            <IconButton size="small" onClick={onDelete}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton size="small" onClick={onUpdate}>
              <EditOutlinedIcon />
            </IconButton>

            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
            {/* Comments:*/}
          </CardActions>
          {expanded && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Comments:</Typography>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Box key={comment.id} sx={{ marginBottom: 1 }}>
                    <Typography>{comment.comment}</Typography>
                  </Box>
                ))
              ) : (
                <Typography>No comments yet.</Typography>
              )}
            </Box>
          )}
        </React.Fragment>
      </Card>
    </Box>
  );
}

/* {expanded && (
            <Box sx={{ padding: 2 }}>
              {comment ? (
                <Typography variant="h6">Comments:</Typography>
              ) : (
                comment?.map((comment) => (
                  <Box key={comment.id} sx={{ marginBottom: 1 }}>
                    <Typography>{comment.comment}</Typography>
                  </Box>
                ))
              )}
            </Box>
          )} */
