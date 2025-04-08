import About from "../components/About";
import TermsConditions from "../components/TermsConditions";

export default function AboutPage() {
  return (
    <>
      <About />
      <img src={"/src/assets/images/communityenvironment.jpeg"} width={600} />
      <TermsConditions />
    </>
  );
}
