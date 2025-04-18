import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia, IconButton, styled, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useUserContext } from "../context/userContext";
import UpdatePost from "./UpdatePost";

//Expand function for card to display comments relating to that post.
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
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const { currentUser } = useUserContext(); //get current user from userContext.
  const [openModal, setOpenModal] = useState(false); //set up modal use for updating posts.

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded && post.id) {
      axios
        .get(`api/comment/${post.id}`)
        .then((res) => {
          console.log(res.data);
          setComments(res.data.data);
        })
        .catch((err) => console.error("Failed to load Comments", err));
    }
  }, [expanded, post.id]);

  const handleCommentSubmit = async () => {
    if (!currentUser) {
      alert("you must be logged in to comment");
      return;
    }
    if (!comment.trim()) return;
    try {
      const newComment = {
        userId: currentUser.id,
        postId: post.id,
        comment: comment.trim(),
      };
      const response = await axios.post("/api/comment/create", newComment);
      setComments((prev) => [...prev, response.data.data]); //add the new comment into the comments list.
      setComment(""); //reset comment
    } catch (error) {
      console.error("Error, could not submit comment: ", error);
    }
  };

  /*const handleUpdatePost = () => {
    // Logic to update or refresh posts after successful update
    console.log("Post updated!");
    fetchPosts(); // Or any function that refreshes the list of posts
  };*/
  return (
    <Box sx={{ width: "100%", maxWidth: 275 }}>
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
          {currentUser && currentUser.id ? (
            <Box>
              <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <IconButton onClick={handleCommentSubmit}>
                <SendIcon />
              </IconButton>
            </Box>
          ) : (
            <Typography variant="body2">Login to Comment</Typography>
          )}

          {/* Buttons: */}
          <CardActions>
            {currentUser && currentUser.id === post.userId && (
              <>
                <IconButton size="small" onClick={onDelete}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
                <IconButton size="small" onClick={() => setOpenModal(true)}>
                  <EditOutlinedIcon />
                </IconButton>
              </>
            )}

            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
            {/* Comments:*/}
          </CardActions>
          {expanded && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Comments:</Typography>
              {comments.length > 0 ? (
                comments
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((comment) => (
                    <Box key={comment.id} sx={{ marginBottom: 1, padding: 1, border: "1px solid #ccc", borderRadius: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
                        {comment.user?.firstName}
                        {/* Anonymous included as a backup - all users who wish to post should be logged in before they can do so.  */}
                      </Typography>
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

      {/*Add Modal Input: */}
      <UpdatePost
        open={openModal}
        handleClose={() => setOpenModal(false)}
        post={post}
        onUpdate={(updatedPost) => {
          setOpenModal(false);
          onUpdate(post.id, updatedPost);
        }}
      />
    </Box>
  );
}
