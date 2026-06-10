import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyProductsChart = ({ data }) => {
  if (!data?.length) return null;

  const formatted = data.map((item) => ({
    month: `${item._id.year}-${item._id.month}`,
    count: item.count,
  }));

  return (
    <div className="bg-white border rounded-xl p-4 h-[300px]">
      <h2 className="text-sm font-semibold mb-3">
        Monthly Product Growth
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#111827"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyProductsChart;