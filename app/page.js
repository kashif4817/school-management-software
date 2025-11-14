// ==============================================
// LOGIN PAGE - ROOT ROUTE (/)
// ==============================================
// This is the main login page where ALL users (Admin, Teacher, Student) log in
// After successful login, users are redirected based on their role

'use client'; // This is a Client Component (needs interactivity)

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  // Store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store loading state (to disable button during login)
  const [isLoading, setIsLoading] = useState(false);

  // Store error messages (if login fails)
  const [error, setError] = useState('');

  // Next.js router for navigation after successful login
  const router = useRouter();

  // ==========================================
  // HANDLE FORM SUBMISSION
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Clear any previous errors
    setError('');

    // Set loading state (shows "Logging in..." on button)
    setIsLoading(true);

    try {
      // ======================================
      // STEP 1: SEND LOGIN REQUEST TO API
      // ======================================
      // Send POST request to our login API route
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Parse JSON response from API
      const data = await response.json();

      // ======================================
      // STEP 2: CHECK IF LOGIN WAS SUCCESSFUL
      // ======================================
      if (data.success) {
        // Login successful! The JWT token is now stored in httpOnly cookie
        // The cookie was set by the API route (we can't access it from JavaScript)

        // ====================================
        // STEP 3: REDIRECT BASED ON USER ROLE
        // ====================================
        // The API response includes the user's role
        // Redirect to the appropriate dashboard:

        if (data.user.role === 'ADMIN') {
          // Admin user → Go to admin dashboard
          router.push('/admin');
        } else if (data.user.role === 'TEACHER') {
          // Teacher user → Go to teacher dashboard (future)
          router.push('/teacher');
        } else if (data.user.role === 'STUDENT') {
          // Student user → Go to student dashboard (future)
          router.push('/student');
        } else {
          // Unknown role (shouldn't happen, but handle it)
          setError('Invalid user role');
        }
      } else {
        // ====================================
        // LOGIN FAILED
        // ====================================
        // Show error message from API (e.g., "Invalid email or password")
        setError(data.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      // ======================================
      // HANDLE NETWORK OR OTHER ERRORS
      // ======================================
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // ==========================================
  // RENDER LOGIN FORM UI
  // ==========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            School Management System
          </h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
              disabled={isLoading} // Disable input during loading
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              disabled={isLoading} // Disable input during loading
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Test Credentials Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-3">Test Credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Admin:</strong> admin@school.com / admin123</p>
            <p><strong>Teacher:</strong> teacher@school.com / teacher123</p>
            <p><strong>Student:</strong> student@school.com / student123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// COMPLETE FLOW SUMMARY:
// ==============================================
// 1. User sees this login form at / (root)
// 2. User enters email and password
// 3. User clicks "Sign In" button
// 4. handleSubmit() function runs
// 5. Form data sent to /api/auth/login via fetch()
// 6. API checks database and creates JWT token
// 7. API stores JWT in httpOnly cookie
// 8. API returns success response with user role
// 9. Frontend redirects based on role:
//    - ADMIN → /admin
//    - TEACHER → /teacher
//    - STUDENT → /student
// 10. Middleware checks the JWT cookie on redirect
// 11. If valid, user sees their dashboard
// 12. If invalid, middleware redirects back to login
// ==============================================
