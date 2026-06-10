const RecentUsers = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="bg-white border rounded-xl p-4">
      <h2 className="text-sm font-semibold mb-3">Recent Users</h2>

      <div className="space-y-2">
        {data.map((u) => (
          <div
            key={u._id}
            className="flex justify-between text-sm border-b pb-2"
          >
            <span>{u.name}</span>
            <span className="text-gray-500">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;