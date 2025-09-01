"use client";

import { useState } from "react";
import Header from "../Header/Header";
import HeaderFilters from "../HeaderFilters/HeaderFilters";
import Main from "../Main/Main";
import Footer from "../footer/Footer";
 

const MainAplication = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <section className="w-full h-auto bg-gray-50 flex flex-col gap-[32px]">
      <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <HeaderFilters />
      <Main isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Footer />
    </section>
  );
};

export default MainAplication;
