import { getUsers } from "@/api/users.api";
import { useEffect, useState } from "react";


const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u) => (
        <div key={u._id} className="border p-3 mb-2">
          <p>{u.name}</p>
          <p>{u.email}</p>
          <p className="text-sm text-gray-500">{u.role}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;