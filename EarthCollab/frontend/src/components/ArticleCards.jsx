import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PdfViewer from "./PDFViewer";

export default function ArticleCard({ article, user, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /* const handleViewDetails = () => {
    navigate(`/article/${article.id}`, { state: { article } });
  };*/
  return (
    /*Render the cards in a grid to show PDFS: */
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
            <Button size="small" onClick={handleOpen}>
              Read
            </Button>
            <IconButton size="small" onClick={onDelete}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>

      {/*View PDF Modal: */}
      {open && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>{article.title}</DialogTitle>
          <DialogContent>
            {article.pdfLink ? <PdfViewer file={`http://localhost:5000${article.pdfLink}`} /> : <Typography>No PDF available.</Typography>}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
