import { Typography } from "@mui/material";
import PDFUpload from "../components/PDFUpload";

//NOTE: NAME OF WEB-PAGE STILL PENDING.
export default function Homepage() {
  return (
    <>
      <div className="Homepage">
        <h1>GreenEarth Community Collaboration Hub</h1>
        <img src={"/src/assets/images/Turtle.jpg"} width={600} />
      </div>
      <h2>
        Empowering individuals, community and organisations to enhance environment and sustainability through collaborative learning and
        knowledge
      </h2>
    </>
  );
}
