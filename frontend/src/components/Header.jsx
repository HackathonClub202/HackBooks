// src/components/Header.js
import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
};

export default Header;
