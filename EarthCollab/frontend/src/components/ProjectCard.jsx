import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardMedia, IconButton, styled } from "@mui/material";
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

export default function ProjectCard({ project, user, onDelete }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleViewDetails = () => {
    navigate(`/posts/${project.id}`, { state: { project } });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            {project.image && <CardMedia component="img" height={140} image={project.image} alt={project.title} />}
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {project.category}
            </Typography>
            <Typography variant="h5" component="div">
              Title: {project.title}
            </Typography>
            <Typography variant="body2">{project.content}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleViewDetails}>
              Read
            </Button>
            <IconButton size="small" onClick={onDelete}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton size="small" onClick={onDelete}>
              <EditOutlinedIcon />
            </IconButton>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
