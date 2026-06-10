import { useEffect, useState } from "react";
import { getStats } from "@/api/stats.api";
import StatsCards from "./StatsCards";
import ProductsByCategoryChart from "./2. ProductsByCategoryChart";
import UsersByRoleChart from "./UsersByRoleChart";
import RecentProducts from "./RecentProducts";
import RecentUsers from "./RecentUsers";
import MonthlyProductsChart from "./MonthlyProductsChart";
import DashboardSkeleton from "./DashboardSkeleton";
// import StatsCards from "@/components/dashboard/StatsCards";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getStats();
      setStats(res.data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <DashboardSkeleton/>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <UsersByRoleChart data={stats.usersByRole} />
        <ProductsByCategoryChart data={stats.productsByCategory} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <RecentProducts data={stats.recentProducts} />
    <RecentUsers data={stats.recentUsers} />
  </div>
  <MonthlyProductsChart data={stats.monthlyProducts} />

    </div>
  );
};

export default DashboardPage;