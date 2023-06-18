import { Helmet } from "react-helmet-async";
import SectionCourse from "../SectionCourse/SectionCourse";
import Slider from "../Slider/Slider";
import SixInstructors from "../../AllInstructors/SixInstructors";
import ExtraSection from "../../ExtraSecton/ExtraSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>LanguageClub | Home</title>
      </Helmet>
      <Slider></Slider>
      <SectionCourse></SectionCourse>
      <SixInstructors></SixInstructors>
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default Home;
