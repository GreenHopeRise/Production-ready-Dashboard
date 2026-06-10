const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-xl border"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="h-[300px] bg-gray-200 rounded-xl border" />
        <div className="h-[300px] bg-gray-200 rounded-xl border" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="h-[300px] bg-gray-200 rounded-xl border" />
        <div className="h-[300px] bg-gray-200 rounded-xl border" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;