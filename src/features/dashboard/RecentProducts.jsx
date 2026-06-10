const RecentProducts = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="bg-white border rounded-xl p-4">
      <h2 className="text-sm font-semibold mb-3">Recent Products</h2>

      <div className="space-y-2">
        {data.map((p) => (
          <div
            key={p._id}
            className="flex justify-between text-sm border-b pb-2"
          >
            <span className="font-medium">{p.name}</span>
            <span className="text-gray-500">${p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;