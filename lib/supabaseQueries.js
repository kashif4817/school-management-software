// Helper functions for common Supabase operations
import { supabase } from '@/lib/supabase';

export const supabaseQueries = {
  // STUDENTS
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*, classes(name)')
      .order('roll_number');
    return { data, error };
  },

  async getStudent(id) {
    const { data, error } = await supabase
      .from('students')
      .select('*, classes(name)')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createStudent(student) {
    // Validate required fields
    if (!student.first_name || !student.last_name || !student.email || !student.roll_number) {
      return { 
        data: null, 
        error: { 
          message: 'Missing required fields: first_name, last_name, email, roll_number' 
        } 
      };
    }

    const { data, error } = await supabase
      .from('students')
      .insert([{
        roll_number: student.roll_number,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        phone: student.phone || null,
        class_id: student.class_id || null,
        gender: student.gender || null,
        date_of_birth: student.date_of_birth || null,
        address: student.address || null,
        guardian_name: student.guardian_name || null,
        guardian_phone: student.guardian_phone || null,
        status: student.status || 'Active',
        admission_date: student.admission_date || new Date().toISOString().split('T')[0],
      }])
      .select()
      .single();
    return { data, error };
  },

  async updateStudent(id, student) {
    const { data, error } = await supabase
      .from('students')
      .update(student)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteStudent(id) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    return { error };
  },

  // TEACHERS
  async getTeachers() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('first_name');
    return { data, error };
  },

  async getTeacher(id) {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createTeacher(teacher) {
    // Validate required fields
    if (!teacher.first_name || !teacher.last_name || !teacher.email || !teacher.subject || !teacher.join_date) {
      return { 
        data: null, 
        error: { 
          message: 'Missing required fields: first_name, last_name, email, subject, join_date' 
        } 
      };
    }

    const { data, error } = await supabase
      .from('teachers')
      .insert([{
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        phone: teacher.phone || null,
        subject: teacher.subject,
        qualification: teacher.qualification || null,
        experience_years: teacher.experience_years ? parseInt(teacher.experience_years, 10) : null,
        join_date: teacher.join_date,
        status: teacher.status || 'Active',
        address: teacher.address || null,
      }])
      .select()
      .single();
    return { data, error };
  },

  async updateTeacher(id, teacher) {
    const { data, error } = await supabase
      .from('teachers')
      .update(teacher)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteTeacher(id) {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);
    return { error };
  },

  // CLASSES
  async getClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*, teachers(first_name, last_name)')
      .order('name');
    return { data, error };
  },

  async getClass(id) {
    const { data, error } = await supabase
      .from('classes')
      .select('*, teachers(first_name, last_name)')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createClass(classData) {
    const { data, error } = await supabase
      .from('classes')
      .insert([classData])
      .select()
      .single();
    return { data, error };
  },

  async updateClass(id, classData) {
    const { data, error } = await supabase
      .from('classes')
      .update(classData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteClass(id) {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
    return { error };
  },

  // ATTENDANCE
  async getAttendance(filters = {}) {
    let query = supabase.from('attendance').select('*, students(roll_number, first_name, last_name)');
    
    if (filters.classId) {
      query = query.eq('class_id', filters.classId);
    }
    if (filters.date) {
      query = query.eq('attendance_date', filters.date);
    }

    const { data, error } = await query.order('students(roll_number)');
    return { data, error };
  },

  async markAttendance(attendance) {
    const { data, error } = await supabase
      .from('attendance')
      .upsert(attendance, { onConflict: 'student_id,attendance_date' })
      .select();
    return { data, error };
  },

  // EXAMS
  async getExams() {
    const { data, error } = await supabase
      .from('exams')
      .select('*, classes(name)')
      .order('exam_date');
    return { data, error };
  },

  async getExam(id) {
    const { data, error } = await supabase
      .from('exams')
      .select('*, classes(name)')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createExam(exam) {
    const { data, error } = await supabase
      .from('exams')
      .insert([exam])
      .select()
      .single();
    return { data, error };
  },

  async updateExam(id, exam) {
    const { data, error } = await supabase
      .from('exams')
      .update(exam)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteExam(id) {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);
    return { error };
  },

  // SCHOOL SETTINGS
  async getSettings() {
    const { data, error } = await supabase
      .from('school_settings')
      .select('*')
      .single();
    return { data, error };
  },

  async updateSettings(id, settings) {
    const { data, error } = await supabase
      .from('school_settings')
      .update(settings)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};
