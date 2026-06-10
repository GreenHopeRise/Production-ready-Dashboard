import { getUsers, updateUserRole, deleteUser } from "@/api/users.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPersonWalkingArrowLoopLeft, FaPersonWalkingArrowRight } from "react-icons/fa6";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectUser, setSelectUser] = useState(null);
  const [role, setRole] = useState("");

  const [apiLoading, setApiLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
    const [page, setPage] = useState(1)
  const limit =10
  const paginatedUsers = users.slice(
  (page - 1) * limit,
  page * limit
);

const totalPages = Math.ceil(users.length / limit);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- ROLE UPDATE ----------------
  const handleUpdateRole = async () => {
    try {
      setApiLoading(true);

      await updateUserRole(selectUser._id, role);

      await fetchUsers();

      setOpen(false);
      setSelectUser(null);
      setRole("");
    } catch (err) {
      console.error(err);
    } finally {
      setApiLoading(false);
    }
  };

  // ---------------- DELETE USER ----------------
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  const prevUsers = [...users];

  setUsers((prev) => prev.filter((u) => u._id !== id));

  try {
    setDeleteLoading(id);

    await deleteUser(id);

    toast.success("User deleted successfully");
  } catch (err) {
    setUsers(prevUsers);

    toast.error(
      err?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setDeleteLoading(null);
  }
};

  // ---------------- ROLE STYLE ----------------
  const getRoleStyle = (role) => {
    switch (role) {
      case "admin":
        return "bg-green-100 text-green-700";
      case "editor":
        return "bg-blue-100 text-blue-700";
      case "user":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="p-5 space-y-3">
        <div  className="h-25 bg-gray-200 animate-pulse rounded" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!users.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No users found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-5">
      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-gray-500">
          Manage all system users
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium">{u.name}</td>
                <td className="py-4">{u.email}</td>

                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleStyle(u.role)}`}>
                    {u.role}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex gap-2">
                    
                    <button
                      className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectUser(u);
                        setRole(u.role);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50 cursor-pointer"
                      onClick={() => handleDelete(u._id)}
                      disabled={deleteLoading === u._id}
                    >
                      {deleteLoading === u._id ? "Deleting..." : "Delete"}
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-3 mt-6">
          
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <FaPersonWalkingArrowLoopLeft className="text-red-400" />
          </button>
        
          <span className="text-sm">
            {page} / {totalPages}
          </span>
        
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <FaPersonWalkingArrowRight className="text-blue-400  " />
          </button>
        
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl p-6">

            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Update Role
              </h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <input
              disabled
              value={selectUser?.name || ""}
              className="w-full border p-2 rounded bg-gray-100 mb-3"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>

            <button
              onClick={handleUpdateRole}
              disabled={apiLoading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {apiLoading ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;