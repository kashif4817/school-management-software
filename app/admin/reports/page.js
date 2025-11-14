'use client';

import { Download, FileText, BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const reportTypes = [
    { id: 'attendance', name: 'Attendance Reports', icon: Calendar, description: 'Daily, weekly, monthly attendance analytics' },
    { id: 'academic', name: 'Academic Performance', icon: BarChart3, description: 'Student grades and performance metrics' },
    { id: 'financial', name: 'Financial Reports', icon: TrendingUp, description: 'Fee collection and financial summaries' },
    { id: 'enrollment', name: 'Enrollment Statistics', icon: Users, description: 'Student enrollment trends and data' },
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Attendance Report - November', type: 'Attendance', date: '2024-11-10', size: '2.4 MB' },
    { id: 2, name: 'Q2 Academic Performance Analysis', type: 'Academic', date: '2024-11-08', size: '3.1 MB' },
    { id: 3, name: 'Student Enrollment Report 2024', type: 'Enrollment', date: '2024-11-05', size: '1.8 MB' },
    { id: 4, name: 'Fee Collection Report - October', type: 'Financial', date: '2024-11-01', size: '2.7 MB' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Generate and download comprehensive reports</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg transition flex items-center gap-2 shadow-md">
          <FileText className="h-5 w-5" />
          Generate Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Total Reports</span>
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">248</p>
          <p className="text-xs text-gray-600 mt-1">↑ 12 this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Generated Today</span>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-xs text-gray-600 mt-1">Various types</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Scheduled</span>
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <p className="text-xs text-gray-600 mt-1">Auto-generated</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Storage Used</span>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12.8 GB</p>
          <p className="text-xs text-gray-600 mt-1">Total reports</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                className="p-5 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-xs text-gray-600">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(report.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{report.size}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
