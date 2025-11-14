// ==============================================
// LOGOUT API ROUTE
// ==============================================
// This handles GET requests to /api/auth/logout
// It deletes the JWT cookie and logs the user out

import { NextResponse } from 'next/server';

// ==============================================
// GET /api/auth/logout
// ==============================================
export async function GET(request) {
  // Create a response that redirects to the login page
  const response = NextResponse.redirect(new URL('/', request.url));

  // Delete the auth-token cookie
  // This effectively logs the user out
  response.cookies.delete('auth-token');

  return response;
}

// ==============================================
// HOW LOGOUT WORKS:
// ==============================================
// 1. User clicks "Logout" button (links to /api/auth/logout)
// 2. This API route is called
// 3. We delete the 'auth-token' cookie
// 4. User is redirected to login page
// 5. Without the cookie, middleware blocks access to protected routes
// 6. User must log in again to get a new token
// ==============================================
