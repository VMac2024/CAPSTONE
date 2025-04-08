import * as React from "react";
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

  const handleViewDetails = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
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
          <TextField label="Comment" variant="outlined" fullWidth multiline rows={2} value={comment} />
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
          </CardActions>
          {expanded && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Comments:</Typography>
              {comment.map((comment) => (
                <Box key={comment.id} sx={{ marginBottom: 1 }}>
                  <Typography>{comment.comment}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </React.Fragment>
      </Card>
    </Box>
  );
}
