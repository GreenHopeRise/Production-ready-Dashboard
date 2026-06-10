import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#111827", "#2563eb", "#16a34a", "#f59e0b"];

const UsersByRoleChart = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="bg-white border rounded-xl p-4 h-[300px]">
      <h2 className="text-sm font-semibold mb-3">Users by Role</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersByRoleChart;