import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardMedia } from "@mui/material";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {post.category}
            </Typography>
            <Typography variant="h5" component="div">
              Title: {post.title}
            </Typography>
            <CardMedia component="img" height="140" image={post.image} alt={post.title} />
            <Typography variant="body2">{post.content}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleViewDetails}>
              Read
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
