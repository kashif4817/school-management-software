'use client';

import { useState, useEffect } from 'react';
import { Calendar, Download, Filter, CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import StatsCard from '@/components/admin/StatsCard';
import FormInput from '@/components/admin/FormInput';
import { supabaseQueries } from '@/lib/supabaseQueries';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');

  // Sample data - replace with actual API call
  const attendanceData = [
    { id: 1, rollNo: '001', name: 'John Doe', status: 'present', checkIn: '8:45 AM' },
    { id: 2, rollNo: '002', name: 'Jane Smith', status: 'present', checkIn: '8:50 AM' },
    { id: 3, rollNo: '003', name: 'Mike Johnson', status: 'absent', checkIn: '-' },
    { id: 4, rollNo: '004', name: 'Sarah Williams', status: 'late', checkIn: '9:15 AM' },
    { id: 5, rollNo: '005', name: 'Tom Brown', status: 'present', checkIn: '8:40 AM' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Present
        </span>;
      case 'absent':
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Absent
        </span>;
      case 'late':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Late
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Track and manage student attendance records</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-lg">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present Today</p>
              <p className="text-3xl font-bold text-green-600 mt-2">1,145</p>
              <p className="text-sm text-gray-500 mt-1">92.7% attendance</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent Today</p>
              <p className="text-3xl font-bold text-red-600 mt-2">65</p>
              <p className="text-sm text-gray-500 mt-1">5.3% absent</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">24</p>
              <p className="text-sm text-gray-500 mt-1">2.0% late</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
              <p className="text-sm text-gray-500 mt-1">All classes</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Calendar className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="10-A">Class 10-A</option>
              <option value="10-B">Class 10-B</option>
              <option value="9-A">Class 9-A</option>
              <option value="11-A">Class 11-A</option>
              <option value="12-A">Class 12-A</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <Filter className="h-5 w-5" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Attendance for Class {selectedClass} - {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.rollNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                      {record.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{record.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(record.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.checkIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-indigo-100 text-sm">Total Students in Class</p>
            <p className="text-3xl font-bold mt-1">45</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-indigo-100 text-sm">Marked Present</p>
            <p className="text-3xl font-bold mt-1">42</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-indigo-100 text-sm">Attendance Rate</p>
            <p className="text-3xl font-bold mt-1">93.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
