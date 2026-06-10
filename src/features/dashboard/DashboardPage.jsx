import { useEffect, useState } from "react";
import { getStats } from "@/api/stats.api";
import CategoryChart from "./CategoryChart";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const adminCount = stats?.usersByRole?.find((item)=>item._id==='admin')?.count || 0
  const editorCount = stats?.usersByRole?.find((item)=>item._id==='editor')?.count || 0

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading Dashboard...</p>;
  }

  return (
<div className="space-y-6">

    <h1 className="text-2xl font-bold">
      Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">
          Total Users
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.totalUsers}
        </h2>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">
          Total Products
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.totalProducts}
        </h2>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">
          Admins
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {adminCount}
        </h2>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">
          Editors
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {editorCount}
        </h2>
      </div>

    </div>
    <CategoryChart
  data={stats.productsByCategory}
/>

  </div>
  );
};

export default DashboardPage;