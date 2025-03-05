import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateUSer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load user data");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (userData) => {
    setIsSaving(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${id}`,
        userData
      );
      toast.success("User updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between my-7">
        <Link to="/" className=" bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-md text-xs md:text-sm">
          Back
        </Link>
        <h2 className="text-lg md:text-2xl font-semibold text-gray-700 ">
          Update user information
        </h2>
      </div>
      {isLoading && <p className="text-gray-600">Loading user...</p>}
      {user && (
        <UserForm user={user} onSubmit={handleSubmit} isLoading={isSaving} />
      )}
    </div>
  );
};

export default UpdateUSer;
