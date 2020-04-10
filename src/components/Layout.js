import Header from './home/Header'
import Footer from './shared/Footer'

const withLayout = (Page, opts = { onlyToolbar: false }) => () => (
  <>
    <Header {...opts} />
    <Page />
    <Footer />
    <style jsx global>{`
      * {
        margin: 0;
        font-family: Helvetica, sans-serif;
        box-sizing: border-box;
      }
      body {
        background: var(--blue);
      }
      :root {
        --blue: #0c141e;
        --rgb-blue: 10, 20, 30;
        --write: #fff;
        --red: #df2936;
        --alpha: 0.99;
        --margin-lg: 150px;
        --margin-sm: 70px;
        --margin-between: 60px;
        --section-height: 600px;
      }
      .btn {
        border: 0;
        padding: 5px 30px;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-outline {
        border: 0.5px solid #ddd;
        background: transparent;
        color: var(--write);
      }
      .btn-red {
        background: var(--red);
        color: var(--write);
        font-size: 1.2rem;
        padding: 10px 20px;
        font-weight: 700;
      }
      .btn-write {
        background: var(--write);
      }
      .mt40 {
        margin-top: 40px;
      }
      .mt15 {
        margin-top: 15px;
      }
    `}</style>
  </>
)

export default withLayout
