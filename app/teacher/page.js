// ==============================================
// TEACHER DASHBOARD - PROTECTED ROUTE
// ==============================================
// This page is ONLY accessible to users with TEACHER role (or ADMIN)
// The middleware checks the JWT token before allowing access

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Teacher</span>
              <a
                href="/api/auth/logout"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">
                Authentication Successful! 🎉
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>You have successfully logged in as a <strong>TEACHER</strong>.</p>
                <p className="mt-1">The middleware verified your JWT token and allowed access to this protected route.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* My Classes Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Classes</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* My Students Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Students</p>
                <p className="text-3xl font-bold text-gray-900">245</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Assignments Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Assignments</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Classes */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Classes</h3>
            <p className="text-gray-600 mb-4">View and manage your assigned classes</p>
            <button className="text-blue-600 font-medium hover:text-blue-800">
              View Classes →
            </button>
          </div>

          {/* Student Attendance */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendance</h3>
            <p className="text-gray-600 mb-4">Mark and view student attendance records</p>
            <button className="text-blue-600 font-medium hover:text-blue-800">
              Take Attendance →
            </button>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Assignments</h3>
            <p className="text-gray-600 mb-4">Create and grade student assignments</p>
            <button className="text-blue-600 font-medium hover:text-blue-800">
              Manage Assignments →
            </button>
          </div>

          {/* Gradebook */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gradebook</h3>
            <p className="text-gray-600 mb-4">View and manage student grades</p>
            <button className="text-blue-600 font-medium hover:text-blue-800">
              View Grades →
            </button>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-blue-800 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🔒 Teacher Authentication Working!</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ User logged in with TEACHER credentials</li>
            <li>✅ JWT token created with TEACHER role</li>
            <li>✅ Token stored in httpOnly cookie</li>
            <li>✅ Middleware verified token and role</li>
            <li>✅ Access granted to /teacher route</li>
            <li>✅ Teachers can also access /teacher routes (role-based access)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

// ==============================================
// HOW YOU GOT HERE:
// ==============================================
// 1. You logged in at / (root) with teacher@school.com
// 2. Login API checked database and found your user
// 3. API verified password (plain text match)
// 4. API created JWT token with your role (TEACHER)
// 5. JWT token stored in httpOnly cookie
// 6. Frontend redirected you to /teacher
// 7. Middleware intercepted the request
// 8. Middleware verified JWT token (signature + expiry)
// 9. Middleware checked: role === 'TEACHER' ✅
// 10. Middleware allowed the request to continue
// 11. This page loaded successfully!
//
// Note: ADMIN users can also access this page (see middleware logic)
// ==============================================
