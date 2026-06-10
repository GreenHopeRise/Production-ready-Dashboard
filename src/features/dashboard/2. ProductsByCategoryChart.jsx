import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductsByCategoryChart = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="bg-white border rounded-xl p-4 h-[300px]">
      <h2 className="text-sm font-semibold mb-3">
        Products by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#111827" radius={[8, 8, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsByCategoryChart;