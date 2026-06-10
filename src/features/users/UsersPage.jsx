import { getUsers, updateUserRole } from "@/api/users.api";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)
  const [selectUser, setSelectUser] = useState(null)
  const [role, setRole] = useState('')
  const [apiLoading, setApiLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
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
const handleUpdateRole = async () => {
  try {
    setApiLoading(true);

    await updateUserRole(
      selectUser._id,
      role
    );

    await fetchUsers();

    setOpen(false);

    setSelectUser(null);

  } catch (err) {
    console.error(err);
  } finally {
    setApiLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl border p-5">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-gray-500">
          Manage all system users
        </p>
      </div>

      {/* Table */}
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
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 font-medium">
                  {u.name}
                </td>

                <td className="py-4">
                  {u.email}
                </td>

                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleStyle(u.role)}`}>
                    {u.role}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100" onClick={()=>{
                      setSelectUser(u)
                      setOpen(true)
                      setRole(u.role)
                    }}>
                      Edit
                    </button>

                    <button className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
  open && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Update User Role
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="block text-sm mb-1">
              User
            </label>

            <input
              disabled
              value={selectUser?.name || ""}
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="admin">
                Admin
              </option>

              <option value="editor">
                Editor
              </option>

              <option value="user">
                User
              </option>
            </select>
          </div>

          <button onClick={handleUpdateRole}
            className="w-full bg-black text-white py-2 rounded"
            disabled={apiLoading}
          >
            {apiLoading? 'Saving...':'Save Changes'}
          </button>

        </div>

      </div>

    </div>
  )
}
      </div>
    </div>
  );
};

export default UsersPage;