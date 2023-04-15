import React from "react";
import Header from "../../components/Customer/Header";
import Footer from "../../components/Customer/Footer";
import Login from "../../components/Customer/Login";
import Slider from "../../components/Customer/Slider.js";
import Chat from "../../components/Customer/Chat";
const Home = () => {
  return (
    <>
      <Header />
      <Login />
      <Slider />
      <Chat />
      <Footer />
    </>
  );
};

export default Home;
