'use client';

import { useState } from 'react';
import { Bell, User, LogOut, ChevronDown, Settings, Calendar, Clock } from 'lucide-react';

export default function AdminTopbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    window.location.href = '/api/auth/logout';
  };

  const notifications = [
    { id: 1, title: 'New student enrolled', message: 'John Doe has been added to Class 10-A', time: '2 hours ago', unread: true },
    { id: 2, title: 'Exam scheduled', message: 'Mathematics final exam on Dec 15', time: '5 hours ago', unread: true },
    { id: 3, title: 'Attendance marked', message: 'Class 9-A attendance completed', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome back, Admin!
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar size={12} className="text-indigo-500" />
                <span className="font-medium">{currentDate}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={12} className="text-purple-500" />
                <span className="font-medium">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button className="hidden lg:flex items-center gap-2 p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200">
            <Settings size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 group"
            >
              <Bell size={20} className="transition-transform group-hover:scale-110" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <Bell size={18} className="text-indigo-600" />
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-5 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 cursor-pointer ${
                            notification.unread ? 'bg-indigo-50/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                                notification.unread
                                  ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                                  : 'bg-gray-200'
                              }`}>
                                <Bell size={16} className={notification.unread ? 'text-white' : 'text-gray-500'} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-gray-900">
                                  {notification.title}
                                </p>
                              </div>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                <Clock size={10} />
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-5 py-12 text-center">
                        <Bell size={40} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 font-medium">No notifications</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                    <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 py-2 hover:bg-white rounded-lg transition-all">
                      View all notifications →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-200 mx-1"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-200 group border border-transparent hover:border-indigo-100"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500 font-medium">Administrator</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  <User className="text-white" size={20} />
                </div>
              </div>
              <ChevronDown
                size={16}
                className="text-gray-400 group-hover:text-indigo-600 transition-all duration-200"
              />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="text-white" size={28} />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500 mt-0.5 font-medium">admin@school.com</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                          Administrator
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => window.location.href = '/admin/settings'}
                      className="w-full px-5 py-3 text-left text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 flex items-center gap-3 font-medium"
                    >
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                        <User size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Profile Settings</p>
                        <p className="text-xs text-gray-500">Manage your profile</p>
                      </div>
                    </button>
                    <button
                      onClick={() => window.location.href = '/admin/settings'}
                      className="w-full px-5 py-3 text-left text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 flex items-center gap-3 font-medium"
                    >
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Settings size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Account Settings</p>
                        <p className="text-xs text-gray-500">Preferences & security</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="py-2 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-5 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-3 font-semibold"
                    >
                      <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                        <LogOut size={18} className="text-red-600" />
                      </div>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </header>
  );
}
