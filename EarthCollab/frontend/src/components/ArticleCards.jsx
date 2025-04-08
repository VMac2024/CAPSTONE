import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function ArticleCard({ article, user, onDelete }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/article/${article.id}`, { state: { article } });
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <React.Fragment>
          <CardContent>
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {article.category}
            </Typography>
            <Typography variant="h5" component="div">
              Title: {article.title}
            </Typography>
            <Typography variant="body2">{article.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleViewDetails}>
              Read
            </Button>
            <IconButton size="small" onClick={onDelete}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <EditOutlinedIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
