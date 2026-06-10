const StatsCards = ({ stats }) => {
  const adminCount =
    stats?.usersByRole?.find((i) => i._id === "admin")?.count || 0;

  const editorCount =
    stats?.usersByRole?.find((i) => i._id === "editor")?.count || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <Card title="Total Users" value={stats.totalUsers} />
      <Card title="Total Products" value={stats.totalProducts} />
      <Card title="Admins" value={adminCount} />
      <Card title="Editors" value={editorCount} />

    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default StatsCards;