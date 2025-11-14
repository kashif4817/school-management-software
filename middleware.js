// ==============================================
// EDGE MIDDLEWARE - ROUTE PROTECTION
// ==============================================
// This file runs BEFORE every page loads
// It checks if the user is authenticated and has the correct role
// It runs on the Edge (globally distributed servers, super fast!)

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

// ==============================================
// IMPORTANT: Using 'jose' instead of 'jsonwebtoken'
// ==============================================
// Edge Runtime doesn't support Node.js 'crypto' module
// So we use 'jose' library which is Edge-compatible

// ==============================================
// MIDDLEWARE FUNCTION
// ==============================================
// This function intercepts ALL requests to your app
export async function middleware(request) {
  // Get the current URL path (e.g., '/admin/dashboard', '/teacher', etc.)
  const path = request.nextUrl.pathname;

  // ==========================================
  // STEP 1: GET JWT TOKEN FROM COOKIE
  // ==========================================
  // The JWT token was stored in a cookie named 'auth-token' after login
  // Cookies are automatically sent with every request
  const token = request.cookies.get('auth-token')?.value;

  // ==========================================
  // STEP 2: CHECK IF TOKEN EXISTS
  // ==========================================
  // If there's no token, the user is NOT logged in
  if (!token) {
    // Only redirect to login if trying to access protected routes
    if (path.startsWith('/admin') || path.startsWith('/teacher') || path.startsWith('/student')) {
      console.log('❌ No token found - Redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow access to public routes (like login page)
    return NextResponse.next();
  }

  // ==========================================
  // STEP 3: VERIFY AND DECODE JWT TOKEN
  // ==========================================
  try {
    // Verify the token's signature and decode its contents
    // This ensures the token:
    // 1. Was created by our server (signed with our JWT_SECRET)
    // 2. Has not been tampered with
    // 3. Has not expired

    // Convert JWT_SECRET to Uint8Array (required by jose)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Verify and decode the JWT token using jose
    const { payload } = await jwtVerify(token, secret);

    // The payload contains:
    // - payload.id (user ID)
    // - payload.email (user email)
    // - payload.name (user name)
    // - payload.role (user role: ADMIN, TEACHER, or STUDENT) ← IMPORTANT!

    console.log(`✅ Valid token for ${payload.email} (${payload.role})`);

    // ==========================================
    // STEP 4: CHECK ROUTE PERMISSIONS
    // ==========================================
    // Now check if the user's role can access the requested route

    // If user is trying to access /admin/* routes
    if (path.startsWith('/admin')) {
      if (payload.role !== 'ADMIN') {
        // ==========================================
        // CHANGED: Instead of redirecting to /unauthorized,
        // redirect users back to their own dashboard
        // ==========================================
        console.log(`❌ Access denied: ${payload.role} tried to access /admin`);

        // OLD CODE: return NextResponse.redirect(new URL('/unauthorized', request.url));

        // NEW CODE: Redirect to user's own dashboard based on role
        if (payload.role === 'TEACHER') {
          return NextResponse.redirect(new URL('/teacher', request.url));
        } else if (payload.role === 'STUDENT') {
          return NextResponse.redirect(new URL('/student', request.url));
        }
      }
      // User IS an admin - allow access
      console.log(`✅ Admin access granted to ${payload.email}`);
      return NextResponse.next();
    }

    // If user is trying to access /teacher/* routes
    if (path.startsWith('/teacher')) {
      if (payload.role !== 'TEACHER' && payload.role !== 'ADMIN') {
        // ==========================================
        // CHANGED: Instead of redirecting to /unauthorized,
        // redirect users back to their own dashboard
        // ==========================================
        console.log(`❌ Access denied: ${payload.role} tried to access /teacher`);

        // OLD CODE: return NextResponse.redirect(new URL('/unauthorized', request.url));

        // NEW CODE: Redirect to user's own dashboard based on role
        if (payload.role === 'STUDENT') {
          return NextResponse.redirect(new URL('/student', request.url));
        }
        // Note: ADMIN is allowed to access /teacher, so no redirect needed
      }
      // User IS a teacher or admin - allow access
      console.log(`✅ Teacher access granted to ${payload.email}`);
      return NextResponse.next();
    }

    // If user is trying to access /student/* routes
    if (path.startsWith('/student')) {
      if (payload.role !== 'STUDENT' && payload.role !== 'ADMIN') {
        // ==========================================
        // CHANGED: Instead of redirecting to /unauthorized,
        // redirect users back to their own dashboard
        // ==========================================
        console.log(`❌ Access denied: ${payload.role} tried to access /student`);

        // OLD CODE: return NextResponse.redirect(new URL('/unauthorized', request.url));

        // NEW CODE: Redirect to user's own dashboard based on role
        if (payload.role === 'TEACHER') {
          return NextResponse.redirect(new URL('/teacher', request.url));
        }
        // Note: ADMIN is allowed to access /student, so no redirect needed
      }
      // User IS a student or admin - allow access
      console.log(`✅ Student access granted to ${payload.email}`);
      return NextResponse.next();
    }

    // ==========================================
    // STEP 5: REDIRECT LOGGED-IN USERS FROM LOGIN PAGE
    // ==========================================
    // If user is already logged in and tries to access login page
    // Redirect them to their appropriate dashboard
    if (path === '/') {
      if (payload.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      } else if (payload.role === 'TEACHER') {
        return NextResponse.redirect(new URL('/teacher', request.url));
      } else if (payload.role === 'STUDENT') {
        return NextResponse.redirect(new URL('/student', request.url));
      }
    }

    // Allow access to any other routes
    return NextResponse.next();

  } catch (error) {
    // ==========================================
    // TOKEN VERIFICATION FAILED
    // ==========================================
    // This happens if:
    // 1. Token has expired
    // 2. Token signature is invalid (tampered with)
    // 3. Token is malformed
    console.error('❌ Token verification failed:', error.message);

    // Delete the invalid token
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('auth-token');

    return response;
  }
}

// ==============================================
// CONFIGURE WHICH ROUTES TO RUN MIDDLEWARE ON
// ==============================================
// This tells Next.js which routes should be protected by middleware
export const config = {
  matcher: [
    // Protect these routes:
    '/admin/:path*',      // All admin routes
    '/teacher/:path*',    // All teacher routes
    '/student/:path*',    // All student routes
    '/',                  // Root/login page (to redirect if already logged in)

    // Exclude these routes (don't run middleware on them):
    // - API routes are excluded automatically
    // - Static files (_next, images, etc.) are excluded
  ],
};

// ==============================================
// COMPLETE MIDDLEWARE FLOW:
// ==============================================
// 1. User tries to access a protected route (e.g., /admin/dashboard)
// 2. Middleware intercepts the request BEFORE the page loads
// 3. Middleware checks for 'auth-token' cookie
// 4. If no token → Redirect to login page
// 5. If token exists → Verify it with JWT_SECRET
// 6. If token invalid → Delete token, redirect to login
// 7. If token valid → Decode to get user role
// 8. Check if user's role can access the requested route:
//    - ADMIN can access /admin/*, /teacher/*, /student/*
//    - TEACHER can access /teacher/* only
//    - STUDENT can access /student/* only
// 9. If role matches → Allow access ✅
// 10. If role doesn't match → Redirect to their own dashboard ✅
//     (CHANGED: Previously redirected to /unauthorized page)
//     Examples:
//     - STUDENT tries /admin → Redirect to /student
//     - STUDENT tries /teacher → Redirect to /student
//     - TEACHER tries /admin → Redirect to /teacher
//     - TEACHER tries /student → Redirect to /teacher
//
// This all happens in 10-50 milliseconds!
// No database query needed - all info is in the JWT token
// ==============================================
