import Header from "./Header";
import Footer from "./Footer";

const withLayout = (Page, opts = { onlyToolbar: false }) => () => (
  <>
    <Header {...opts} />
    <Page />
    <Footer />
  </>
);

export default withLayout;
