import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        if (response.status === 201) {
          setUsers(response.data);
        } else {
          toast.error("Failed to load user. Please try again.");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/${selectedUser.id}`
      );
      if (response.status === 201) {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        closeDeleteModal();
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to create user. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2.5">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users List</h2>
        <Link to="/add" className="btn btn-primary flex items-center text-sm">
          Add User
        </Link>
      </div>

      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2 hidden md:table-cell">Phone</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 text-gray-700">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 hidden md:table-cell">
                    {user.phone}
                  </td>
                  <td className="border p-2">{user.gender}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${user.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs md:text-sm"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-600 p-4">No users found</p>
        )
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-black/15 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-2">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete <b>{selectedUser?.name}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
