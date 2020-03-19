import withLayout from "../components/Layout";

import SectionOne from "../components/SectionOne";
import SectionTwo from "../components/SectionTwo";
import SectionTree from "../components/SectionTree";
import SectionFour from "../components/SectionFour";
import SectionFive from "../components/SectionFive";
import SectionSix from "../components/SectionSix";

const Home = () => (
  <main>
    <SectionOne />
    <SectionTwo />
    <SectionTree />
    <SectionFour />
    <SectionFive />
    <SectionSix />
  </main>
);

export default withLayout(Home);
