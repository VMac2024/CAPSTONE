import ArticleGrid from "../components/ArticleGrid";
import PDFUpload from "../components/PDFUpload";
import { useUserContext } from "../context/userContext";

//NOTE: NAME OF WEB-PAGE STILL PENDING.
export default function ArticlesPage() {
  //const { currentUser } = useUserContext();

  /*if (!currentUser) {
    return <div>Please Login to upload a PDF</div>;
  }*/
  return (
    <>
      <div className="Resources">
        <h1>Eco Innovations Articles</h1>
      </div>
      <ArticleGrid />
    </>
  );
}
// <PDFUpload />
//<ArticleGrid />
