'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import StatsCard from '@/components/admin/StatsCard';
import Modal from '@/components/admin/Modal';
import FormInput from '@/components/admin/FormInput';
import { supabaseQueries } from '@/lib/supabaseQueries';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    qualification: '',
    experience_years: '',
    join_date: '',
    status: 'Active',
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    onLeave: 0,
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabaseQueries.getTeachers();
    
    if (error) {
      console.error('Error fetching teachers:', error);
    } else {
      setTeachers(data || []);
      
      const active = data?.filter(t => t.status === 'Active').length || 0;
      const onLeave = data?.filter(t => t.status === 'On Leave').length || 0;

      setStats({
        total: data?.length || 0,
        active,
        onLeave,
      });
    }
    setLoading(false);
  };

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      subject: '',
      qualification: '',
      experience_years: '',
      join_date: '',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setFormData(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteTeacher = async (teacher) => {
    if (confirm(`Are you sure you want to delete ${teacher.first_name} ${teacher.last_name}?`)) {
      const { error } = await supabaseQueries.deleteTeacher(teacher.id);
      if (error) {
        console.error('Error deleting teacher:', error);
      } else {
        fetchTeachers();
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data with proper types
    const preparedData = {
      ...formData,
      experience_years: formData.experience_years ? parseInt(formData.experience_years, 10) : null,
    };

    try {
      if (editingTeacher) {
        const { error } = await supabaseQueries.updateTeacher(editingTeacher.id, preparedData);
        if (error) {
          console.error('Error updating teacher:', error);
          alert(`Error updating teacher: ${error.message || JSON.stringify(error)}`);
          return;
        }
      } else {
        const { error } = await supabaseQueries.createTeacher(preparedData);
        if (error) {
          console.error('Error creating teacher:', error);
          alert(`Error creating teacher: ${error.message || JSON.stringify(error)}`);
          return;
        }
      }
      
      setIsModalOpen(false);
      fetchTeachers();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`Unexpected error: ${err.message}`);
    }
  };

  const columns = [
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
      key: 'subject',
      label: 'Subject',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'experience_years',
      label: 'Experience',
      render: (value) => `${value || 0} years`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          value === 'Active'
            ? 'bg-green-100 text-green-800'
            : value === 'On Leave'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={Users}
          label="Total Teachers"
          value={stats.total}
          trend="↑ 5%"
        />
        <StatsCard
          icon={Users}
          label="Active Teachers"
          value={stats.active}
          trend={`${Math.round((stats.active / stats.total) * 100)}% active`}
        />
        <StatsCard
          icon={Users}
          label="On Leave"
          value={stats.onLeave}
          trend="Currently"
        />
      </div>

      <DataTable
        title="Teachers Management"
        subtitle="Manage all teacher records and assignments"
        data={teachers}
        columns={columns}
        onAdd={handleAddTeacher}
        onEdit={handleEditTeacher}
        onDelete={handleDeleteTeacher}
        searchPlaceholder="Search by name, email, or subject..."
        searchableFields={['first_name', 'last_name', 'email', 'subject']}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleFormChange}
              required
            />
            <FormInput
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleFormChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Experience (Years)"
              name="experience_years"
              type="number"
              value={formData.experience_years}
              onChange={handleFormChange}
            />
            <FormInput
              label="Join Date"
              name="join_date"
              type="date"
              value={formData.join_date}
              onChange={handleFormChange}
            />
          </div>

          <FormInput
            label="Status"
            name="status"
            type="select"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'On Leave', label: 'On Leave' },
              { value: 'Inactive', label: 'Inactive' },
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
              {editingTeacher ? 'Update' : 'Create'} Teacher
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
