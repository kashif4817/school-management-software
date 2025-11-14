'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import StatsCard from '@/components/admin/StatsCard';
import Modal from '@/components/admin/Modal';
import FormInput from '@/components/admin/FormInput';
import { supabaseQueries } from '@/lib/supabaseQueries';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    class_teacher_id: '',
    room_number: '',
    academic_year: new Date().getFullYear().toString(),
  });
  const [stats, setStats] = useState({
    total: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    const { data, error } = await supabaseQueries.getClasses();
    
    if (error) {
      console.error('Error fetching classes:', error);
    } else {
      setClasses(data || []);
      setStats({
        total: data?.length || 0,
        totalStudents: 0,
      });
    }
    setLoading(false);
  };

  const fetchTeachers = async () => {
    const { data, error } = await supabaseQueries.getTeachers();
    if (!error && data) {
      setTeachers(data);
    }
  };

  const handleAddClass = () => {
    setEditingClass(null);
    setFormData({
      name: '',
      section: '',
      class_teacher_id: '',
      room_number: '',
      academic_year: new Date().getFullYear().toString(),
    });
    setIsModalOpen(true);
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setFormData(classItem);
    setIsModalOpen(true);
  };

  const handleDeleteClass = async (classItem) => {
    if (confirm(`Are you sure you want to delete ${classItem.name}?`)) {
      const { error } = await supabaseQueries.deleteClass(classItem.id);
      if (error) {
        console.error('Error deleting class:', error);
      } else {
        fetchClasses();
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
      if (editingClass) {
        const { error } = await supabaseQueries.updateClass(editingClass.id, formData);
        if (error) {
          console.error('Error updating class:', error);
          alert(`Error updating class: ${error.message || JSON.stringify(error)}`);
          return;
        }
      } else {
        const { error } = await supabaseQueries.createClass(formData);
        if (error) {
          console.error('Error creating class:', error);
          alert(`Error creating class: ${error.message || JSON.stringify(error)}`);
          return;
        }
      }
      
      setIsModalOpen(false);
      fetchClasses();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`Unexpected error: ${err.message}`);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Class Name',
    },
    {
      key: 'section',
      label: 'Section',
    },
    {
      key: 'room_number',
      label: 'Room',
    },
    {
      key: 'academic_year',
      label: 'Year',
    },
    {
      key: 'teachers',
      label: 'Class Teacher',
      render: (value) => value ? `${value.first_name} ${value.last_name}` : 'N/A',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          icon={BookOpen}
          label="Total Classes"
          value={stats.total}
          trend="↑ 3 new"
        />
        <StatsCard
          icon={BookOpen}
          label="Active Term"
          value={new Date().getFullYear()}
          trend="2024-2025"
        />
      </div>

      <DataTable
        title="Classes Management"
        subtitle="Manage all classes, schedules, and assignments"
        data={classes}
        columns={columns}
        onAdd={handleAddClass}
        onEdit={handleEditClass}
        onDelete={handleDeleteClass}
        searchPlaceholder="Search by class name or section..."
        searchableFields={['name', 'section']}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClass ? 'Edit Class' : 'Create New Class'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Class Name"
            name="name"
            placeholder="e.g., Class 10-A"
            value={formData.name}
            onChange={handleFormChange}
            required
          />

          <FormInput
            label="Section"
            name="section"
            placeholder="e.g., A, B, C"
            value={formData.section}
            onChange={handleFormChange}
            required
          />

          <FormInput
            label="Room Number"
            name="room_number"
            placeholder="e.g., 101"
            value={formData.room_number}
            onChange={handleFormChange}
          />

          <FormInput
            label="Class Teacher"
            name="class_teacher_id"
            type="select"
            options={teachers.map(t => ({
              value: t.id,
              label: `${t.first_name} ${t.last_name}`
            }))}
            value={formData.class_teacher_id}
            onChange={handleFormChange}
          />

          <FormInput
            label="Academic Year"
            name="academic_year"
            placeholder="e.g., 2024-2025"
            value={formData.academic_year}
            onChange={handleFormChange}
            required
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
              {editingClass ? 'Update' : 'Create'} Class
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
