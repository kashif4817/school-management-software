// ==============================================
// STUDENT DASHBOARD - PROTECTED ROUTE
// ==============================================
// This page is ONLY accessible to users with STUDENT role
// The middleware checks the JWT token before allowing access

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Student Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Student</span>
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">
                Authentication Successful! 🎉
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>You have successfully logged in as a <strong>STUDENT</strong>.</p>
                <p className="mt-1">The middleware verified your JWT token and allowed access to this protected route.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Enrolled Courses Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-900">6</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          {/* Assignments Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Assignments</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </div>

          {/* Overall Grade Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Grade</p>
                <p className="text-3xl font-bold text-gray-900">85%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Courses */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Courses</h3>
            <p className="text-gray-600 mb-4">View your enrolled courses and materials</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-800">
              View Courses →
            </button>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Assignments</h3>
            <p className="text-gray-600 mb-4">Submit and view your assignments</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-800">
              View Assignments →
            </button>
          </div>

          {/* Grades */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Grades</h3>
            <p className="text-gray-600 mb-4">View your grades and performance</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-800">
              View Grades →
            </button>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendance</h3>
            <p className="text-gray-600 mb-4">View your attendance records</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-800">
              View Attendance →
            </button>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-green-800 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🔒 Student Authentication Working!</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ User logged in with STUDENT credentials</li>
            <li>✅ JWT token created with STUDENT role</li>
            <li>✅ Token stored in httpOnly cookie</li>
            <li>✅ Middleware verified token and role</li>
            <li>✅ Access granted to /student route</li>
            <li>✅ Only STUDENT role can access this dashboard</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

// ==============================================
// HOW YOU GOT HERE:
// ==============================================
// 1. You logged in at / (root) with student@school.com
// 2. Login API checked database and found your user
// 3. API verified password (plain text match)
// 4. API created JWT token with your role (STUDENT)
// 5. JWT token stored in httpOnly cookie
// 6. Frontend redirected you to /student
// 7. Middleware intercepted the request
// 8. Middleware verified JWT token (signature + expiry)
// 9. Middleware checked: role === 'STUDENT' ✅
// 10. Middleware allowed the request to continue
// 11. This page loaded successfully!
//
// Note: Only STUDENT users can access this page
// ADMIN and TEACHER will be blocked by middleware
// ==============================================
