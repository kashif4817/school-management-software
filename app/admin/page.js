import Link from 'next/link';
import { Users, GraduationCap, BookOpen, CalendarDays, ClipboardCheck, FileBarChart, TrendingUp, Award } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-indigo-100">Manage your school operations efficiently from one place</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Students Card */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-green-600">↑ 12%</span>
          </div>
          <p className="text-sm text-gray-600">Total Students</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">1,234</p>
          <p className="text-sm text-gray-500 mt-2">Active this semester</p>
        </div>

        {/* Teachers Card */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <span className="text-sm font-semibold text-green-600">↑ 5%</span>
          </div>
          <p className="text-sm text-gray-600">Total Teachers</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">87</p>
          <p className="text-sm text-gray-500 mt-2">Teaching staff</p>
        </div>

        {/* Classes Card */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600">42 Active</span>
          </div>
          <p className="text-sm text-gray-600">Active Classes</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">42</p>
          <p className="text-sm text-gray-500 mt-2">Running courses</p>
        </div>

        {/* Attendance Card */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <CalendarDays className="h-8 w-8 text-orange-600" />
            </div>
            <span className="text-sm font-semibold text-green-600">92.7%</span>
          </div>
          <p className="text-sm text-gray-600">Attendance Today</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">1,145</p>
          <p className="text-sm text-gray-500 mt-2">Students present</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Students Management */}
        <Link href="/admin/students">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition cursor-pointer border-l-4 border-blue-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Students</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage student records, enrollment, and profiles</p>
            <span className="text-blue-600 font-medium hover:text-blue-800">Manage Students →</span>
          </div>
        </Link>

        {/* Teachers Management */}
        <Link href="/admin/teachers">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition cursor-pointer border-l-4 border-green-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Teachers</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage teaching staff and their assignments</p>
            <span className="text-green-600 font-medium hover:text-green-800">Manage Teachers →</span>
          </div>
        </Link>

        {/* Classes Management */}
        <Link href="/admin/classes">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition cursor-pointer border-l-4 border-purple-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Classes</h3>
            </div>
            <p className="text-gray-600 mb-4">Create and manage class schedules</p>
            <span className="text-purple-600 font-medium hover:text-purple-800">Manage Classes →</span>
          </div>
        </Link>

        {/* Attendance */}
        <Link href="/admin/attendance">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition cursor-pointer border-l-4 border-orange-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <CalendarDays className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Attendance</h3>
            </div>
            <p className="text-gray-600 mb-4">Track and manage daily attendance records</p>
            <span className="text-orange-600 font-medium hover:text-orange-800">View Attendance →</span>
          </div>
        </Link>

        {/* Exams */}
        <Link href="/admin/exams">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition cursor-pointer border-l-4 border-indigo-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Exams</h3>
            </div>
            <p className="text-gray-600 mb-4">Schedule and manage examinations</p>
            <span className="text-indigo-600 font-medium hover:text-indigo-800">Manage Exams →</span>
          </div>
        </Link>

        {/* Reports */}
        <Link href="/admin/reports">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition cursor-pointer border-l-4 border-pink-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-pink-100 p-3 rounded-lg">
                <FileBarChart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reports</h3>
            </div>
            <p className="text-gray-600 mb-4">Generate comprehensive analytics and reports</p>
            <span className="text-pink-600 font-medium hover:text-pink-800">View Reports →</span>
          </div>
        </Link>
      </div>

      {/* Recent Activity & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <div className="bg-blue-100 p-2 rounded-full">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New student enrolled</p>
                <p className="text-xs text-gray-500 mt-1">John Doe joined Class 10-A</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <div className="bg-green-100 p-2 rounded-full">
                <ClipboardCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Attendance marked</p>
                <p className="text-xs text-gray-500 mt-1">Class 9-A attendance completed</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Exam scheduled</p>
                <p className="text-xs text-gray-500 mt-1">Mathematics Final Exam for Dec 15</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Attendance</span>
                <span className="text-sm font-semibold text-green-600">92.7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '92.7%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Academic Performance</span>
                <span className="text-sm font-semibold text-blue-600">85.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Student Engagement</span>
                <span className="text-sm font-semibold text-purple-600">78.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '78.5%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold">Overall performance up by 8% this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
