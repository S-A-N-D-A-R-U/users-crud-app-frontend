import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UserForm({ user, onSubmit, isLoading }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user || {
      name: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
    },
  });

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className={`mt-1 input ${errors.name ? "border-red-500" : ""}`}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`mt-1 input ${errors.email ? "border-red-500" : ""}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="text"
          className={`mt-1 input ${errors.phone ? "border-red-500" : ""}`}
          {...register("phone", {
            required: "Phone number is required",
          })}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select id="gender" className="mt-1 input" {...register("gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select id="role" className="mt-1 input" {...register("role")}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
