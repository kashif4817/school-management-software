'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileBarChart,
  Settings,
  School,
  ChevronRight,
  Sparkles,
  UserPlus,
  UsersRound,
  Award,
} from 'lucide-react';

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/admin',
  },
  {
    icon: GraduationCap,
    label: 'Students',
    href: '/admin/students',
    hasDropdown: true,
    subItems: [
      {
        icon: UsersRound,
        label: 'All Students',
        href: '/admin/students',
      },
      {
        icon: UserPlus,
        label: 'Add Student',
        href: '/admin/students/add',
      },
      {
        icon: Award,
        label: 'Performance',
        href: '/admin/students/performance',
      },
    ],
  },
  {
    icon: Users,
    label: 'Teachers',
    href: '/admin/teachers',
    hasDropdown: true,
    subItems: [
      {
        icon: UsersRound,
        label: 'All Teachers',
        href: '/admin/teachers',
      },
      {
        icon: UserPlus,
        label: 'Add Teacher',
        href: '/admin/teachers/add',
      },
    ],
  },
  {
    icon: BookOpen,
    label: 'Classes',
    href: '/admin/classes',
  },
  {
    icon: CalendarDays,
    label: 'Attendance',
    href: '/admin/attendance',
  },
  {
    icon: ClipboardCheck,
    label: 'Exams',
    href: '/admin/exams',
  },
  {
    icon: FileBarChart,
    label: 'Reports',
    href: '/admin/reports',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/admin/settings',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isPending, startTransition] = useTransition();

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Prefetch all routes on component mount for instant navigation
  useEffect(() => {
    const allRoutes = menuItems.flatMap(item => {
      if (item.subItems) {
        return [item.href, ...item.subItems.map(sub => sub.href)];
      }
      return [item.href];
    });

    // Prefetch all routes in a transition for smooth loading
    startTransition(() => {
      allRoutes.forEach(route => {
        router.prefetch(route);
      });
    });
  }, [router]);

  return (
    <aside className="w-60 bg-white border-r border-gray-200 h-full flex flex-col shadow-sm overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <School className="text-white" size={20} />
            </div>
          </div>
          <div>
            <h1 className="text-[15px] font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              School Admin
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto custom-scrollbar">
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              item.subItems?.some((sub) => pathname === sub.href);
            const isDropdownOpen = openDropdown === item.label;

            return (
              <li key={item.href}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                        transition-all duration-200 group
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={19}
                          className={`transition-colors flex-shrink-0 ${
                            isActive ? 'text-indigo-600' : 'text-gray-500'
                          }`}
                        />
                        <span className="text-[13.5px] font-medium">
                          {item.label}
                        </span>
                      </div>
                      <div
                        className={`transition-transform duration-200 flex-shrink-0 ${
                          isDropdownOpen ? 'rotate-90' : ''
                        }`}
                      >
                        <ChevronRight
                          size={15}
                          className={isActive ? 'text-indigo-600' : 'text-gray-400'}
                        />
                      </div>
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-200 ease-in-out
                        ${
                          isDropdownOpen
                            ? 'max-h-96 opacity-100 mt-0.5'
                            : 'max-h-0 opacity-0'
                        }
                      `}
                    >
                      <ul className="ml-3 space-y-0.5 border-l-2 border-gray-200 pl-2.5 mt-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = pathname === subItem.href;

                          return (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                prefetch={true}
                                className={`
                                  flex items-center gap-2 px-2.5 py-2 rounded-lg
                                  transition-all duration-200
                                  ${
                                    isSubActive
                                      ? 'bg-indigo-50 text-indigo-700 font-semibold border-l-2 border-indigo-500 -ml-[2px]'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                  }
                                `}
                              >
                                <SubIcon size={15} className="flex-shrink-0" />
                                <span className="text-[13px]">
                                  {subItem.label}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={`
                      flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                      transition-all duration-200 group
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon
                      size={19}
                      className={`transition-colors flex-shrink-0 ${
                        isActive ? 'text-indigo-600' : 'text-gray-500'
                      }`}
                    />
                    <span className="text-[13.5px] font-medium">
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-100 bg-gradient-to-r from-gray-50 via-indigo-50 to-purple-50">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium justify-center">
          <Sparkles size={12} className="text-indigo-500" />
          <span>Powered by School MS © 2024</span>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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
    </aside>
  );
}
