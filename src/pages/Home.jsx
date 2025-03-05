import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
