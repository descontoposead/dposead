import React, { useState, useEffect } from "react";

import withLayout from "../components/Layout";
import About from "../components/home/About";
import ThreeReasons from "../components/home/ThreeReasons";
import Scarcity from "../components/home/Scarcity";
import Audience from "../components/home/Audience";
import Capitation from "../components/home/Capitation";
import Faq from "../components/home/Faq";
import Modal from "../components/Modal";

export const config = { amp: true };

const Home = () => {
  const [count, setCount] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 5) {
        setModalOpened(true);
        clearInterval(interval);
      }

      setCount(count => count + 1);
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <main>
      <Modal opened={modalOpened} />
      <About />
      <ThreeReasons />
      <Scarcity />
      <Audience />
      <Capitation />
      <Faq />
    </main>
  );
};

export default withLayout(Home);
