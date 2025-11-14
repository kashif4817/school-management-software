'use client';

export default function StatsCard({ icon: Icon, label, value, trend, trendColor = 'green' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trendColor === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
