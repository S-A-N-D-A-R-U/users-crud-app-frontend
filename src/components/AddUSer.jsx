import React, { useState } from "react";
import UserForm from "./UserForm";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddUSer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        userData
      );
      if (response.status === 201) {
        toast.success("User created successfully");
        navigate("/");
      } else {
        toast.error("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <Link to="/" className=" bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-md text-xs md:text-sm">
          Back
        </Link>
        <h2 className=" text-lg md:text-2xl font-semibold text-gray-700 ">
          Add a new user to the system
        </h2>
      </div>
      <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddUSer;
