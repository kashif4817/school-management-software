'use client';

import { useState, useEffect } from 'react';
import { Plus, GraduationCap } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import StatsCard from '@/components/admin/StatsCard';
import Modal from '@/components/admin/Modal';
import FormInput from '@/components/admin/FormInput';
import { supabaseQueries } from '@/lib/supabaseQueries';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    roll_number: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    class_id: '',
    gender: '',
    date_of_birth: '',
    guardian_name: '',
    guardian_phone: '',
    status: 'Active',
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    newThisMonth: 0,
  });

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabaseQueries.getStudents();
    
    if (error) {
      console.error('Error fetching students:', error);
    } else {
      setStudents(data || []);
      
      // Calculate stats
      const active = data?.filter(s => s.status === 'Active').length || 0;
      const thisMonth = data?.filter(s => {
        const date = new Date(s.admission_date);
        const now = new Date();
        return date.getMonth() === now.getMonth() && 
               date.getFullYear() === now.getFullYear();
      }).length || 0;

      setStats({
        total: data?.length || 0,
        active,
        newThisMonth: thisMonth,
      });
    }
    setLoading(false);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      roll_number: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      class_id: '',
      gender: '',
      date_of_birth: '',
      guardian_name: '',
      guardian_phone: '',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = async (student) => {
    if (confirm(`Are you sure you want to delete ${student.first_name} ${student.last_name}?`)) {
      const { error } = await supabaseQueries.deleteStudent(student.id);
      if (error) {
        console.error('Error deleting student:', error);
      } else {
        fetchStudents();
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingStudent) {
        const { error } = await supabaseQueries.updateStudent(editingStudent.id, formData);
        if (error) {
          console.error('Error updating student:', error);
          alert(`Error updating student: ${error.message || JSON.stringify(error)}`);
          return;
        }
      } else {
        const { error } = await supabaseQueries.createStudent(formData);
        if (error) {
          console.error('Error creating student:', error);
          alert(`Error creating student: ${error.message || JSON.stringify(error)}`);
          return;
        }
      }
      
      setIsModalOpen(false);
      fetchStudents();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`Unexpected error: ${err.message}`);
    }
  };

  const columns = [
    {
      key: 'roll_number',
      label: 'Roll No',
    },
    {
      key: 'first_name',
      label: 'Name',
      render: (value, row) => `${row.first_name} ${row.last_name}`,
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'classes',
      label: 'Class',
      render: (value) => value?.name || 'N/A',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          value === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={GraduationCap}
          label="Total Students"
          value={stats.total}
          trend={`↑ 12%`}
        />
        <StatsCard
          icon={GraduationCap}
          label="Active Students"
          value={stats.active}
          trend={`${Math.round((stats.active / stats.total) * 100)}% active`}
        />
        <StatsCard
          icon={GraduationCap}
          label="New This Month"
          value={stats.newThisMonth}
          trend="This month"
        />
      </div>

      {/* Data Table */}
      <DataTable
        title="Students Management"
        subtitle="Manage all student records and information"
        data={students}
        columns={columns}
        onAdd={handleAddStudent}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        searchPlaceholder="Search by name, email, or roll number..."
        searchableFields={['first_name', 'last_name', 'email', 'roll_number']}
        loading={loading}
      />

      {/* Add/Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleFormChange}
              required
            />
            <FormInput
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Roll Number"
              name="roll_number"
              value={formData.roll_number}
              onChange={handleFormChange}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
            />
            <FormInput
              label="Gender"
              name="gender"
              type="select"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
              value={formData.gender}
              onChange={handleFormChange}
            />
          </div>

          <FormInput
            label="Guardian Name"
            name="guardian_name"
            value={formData.guardian_name}
            onChange={handleFormChange}
          />

          <FormInput
            label="Guardian Phone"
            name="guardian_phone"
            value={formData.guardian_phone}
            onChange={handleFormChange}
          />

          <FormInput
            label="Status"
            name="status"
            type="select"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
              { value: 'Graduated', label: 'Graduated' },
              { value: 'Left', label: 'Left' },
            ]}
            value={formData.status}
            onChange={handleFormChange}
          />

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg transition"
            >
              {editingStudent ? 'Update' : 'Create'} Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
