import React from "react";
import Hero from "../componnent/Hero";
import BestSelling from "../componnent/BestSelling";
import Product from "../componnent/Product";
import BuyNow from "../componnent/BuyNow";
import Designers from "../componnent/Designers";
import Features from "../componnent/Features";
import Testimonials from "../componnent/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <BestSelling /> */}
      <Product />
      <BuyNow />
      <Designers />
      <Features />
      <Testimonials />

    </div>  
  );
};

export default Home;
