'use client';

import { useState } from 'react';
import { Save, User, Bell, Lock, Database, Mail, Phone, MapPin } from 'lucide-react';
import FormInput from '@/components/admin/FormInput';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: 'Our School',
    principalName: 'John Director',
    email: 'principal@school.com',
    phone: '+1 234 567 8900',
    address: '123 School Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postalCode: '10001',
    academicYear: '2024-2025',
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: Database },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your school and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">School Information</h2>
                  
                  <FormInput
                    label="School Name"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleFormChange}
                  />

                  <FormInput
                    label="Principal Name"
                    name="principalName"
                    value={formData.principalName}
                    onChange={handleFormChange}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                    <FormInput
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </div>

                  <FormInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                    />
                    <FormInput
                      label="State/Province"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                    />
                    <FormInput
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleFormChange}
                    />
                  </div>

                  <FormInput
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-4">Academic Information</h3>
                  <FormInput
                    label="Current Academic Year"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                      <p className="text-sm text-gray-600 mb-4">Update your admin password regularly for security</p>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                        Change Password
                      </button>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-medium">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h3 className="font-medium text-gray-900 mb-2">Active Sessions</h3>
                      <p className="text-sm text-gray-600 mb-4">Manage your active login sessions</p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600" />
                      <span className="ml-3 text-sm font-medium text-gray-900">Email notifications for new admissions</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600" />
                      <span className="ml-3 text-sm font-medium text-gray-900">Alert on attendance issues</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600" />
                      <span className="ml-3 text-sm font-medium text-gray-900">Daily summary email</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600" />
                      <span className="ml-3 text-sm font-medium text-gray-900">System maintenance alerts</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Database Version</span>
                        <span className="text-sm text-gray-600">v2.1.0</span>
                      </div>
                      <p className="text-sm text-gray-600">Your database is up to date</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Last Backup</span>
                        <span className="text-sm text-gray-600">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Automatic backups enabled</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-medium text-gray-900 mb-2">Data Export</h3>
                      <p className="text-sm text-gray-600 mb-4">Export all school data for backup or migration</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
