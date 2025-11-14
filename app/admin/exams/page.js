'use client';

import { useState, useEffect } from 'react';
import { Plus, Calendar, FileText, Edit, Trash2, Eye, ClipboardCheck } from 'lucide-react';
import { supabaseQueries } from '@/lib/supabaseQueries';

export default function ExamsPage() {
  const [allExams, setAllExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    const { data, error } = await supabaseQueries.getExams();
    if (error) {
      console.error('Error fetching exams:', error);
    } else {
      setAllExams(data || []);
    }
    setLoading(false);
  };

  const now = new Date();
  const upcoming = allExams.filter(e => new Date(e.exam_date) > now);
  const completed = allExams.filter(e => new Date(e.exam_date) <= now);

  const stats = {
    total: allExams.length,
    upcoming: upcoming.length,
    completed: completed.length,
  };

  const getStatusBadge = (date) => {
    if (new Date(date) > now) {
      return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Upcoming</span>;
    }
    return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Completed</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exams Management</h1>
          <p className="text-sm text-gray-600 mt-1">Schedule, manage, and track all examinations</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg transition flex items-center gap-2 shadow-md">
          <Plus className="h-5 w-5" />
          Schedule New Exam
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <ClipboardCheck className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Upcoming</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-r-indigo-600"></div>
            <p className="mt-3 text-gray-600">Loading exams...</p>
          </div>
        ) : allExams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Exam Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{exam.exam_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{exam.classes?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{exam.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(exam.exam_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{exam.total_marks}</td>
                    <td className="px-6 py-4 text-sm">{getStatusBadge(exam.exam_date)}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Eye className="h-4 w-4" /></button>
                        <button className="text-indigo-600 hover:text-indigo-900"><Edit className="h-4 w-4" /></button>
                        <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <ClipboardCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No exams scheduled yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
