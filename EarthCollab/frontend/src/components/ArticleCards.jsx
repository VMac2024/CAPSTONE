import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardMedia, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PdfViewer from "./PDFViewer";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useUserContext } from "../context/userContext";

export default function ArticleCard({ article, user, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useUserContext(); //get current user from useUserContext.

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPdf = () => {
    const cleanedPath = article.pdfLink.startsWith("/public/") ? article.pdfLink.replace("/public", "") : article.pdfLink;
    const fullUrl = `${window.location.origin}${cleanedPath}`;
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  return (
    /*Render the cards in a grid to show PDFS: */
    <Box>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {article.category}
            </Typography>
            <Typography variant="h5" component="div">
              Title: {article.title}
            </Typography>
            <CardMedia component="img" height={140} image={"/src/assets/images/" + article.category + ".jpg"} alt={article.title} />
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {article.category}
            </Typography>
            <Typography variant="body2">{article.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Read
            </Button>
            {currentUser && currentUser.id === article.userId && (
              <IconButton size="small" onClick={onDelete}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
          </CardActions>
        </React.Fragment>
      </Card>

      {/*View PDF Modal: */}
      {open && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {article.title}{" "}
            <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
              ×
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {article.pdfLink ? (
              <PdfViewer file={`http://localhost:8081${article.pdfLink.replace("/public", "")}`} />
            ) : (
              <Typography>No PDF available.</Typography>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
