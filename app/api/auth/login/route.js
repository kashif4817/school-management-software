// ==============================================
// LOGIN API ROUTE
// ==============================================
// This handles POST requests to /api/auth/login
// It checks user credentials and returns a JWT token

import { supabase } from "@/lib/supabase";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

// ==============================================
// IMPORTANT: Using 'jose' instead of 'jsonwebtoken'
// ==============================================
// API routes can run on Edge Runtime, so we use jose for compatibility

// ==============================================
// POST /api/auth/login
// ==============================================
// This function runs when someone submits the login form
export async function POST(request) {
  try {
    // ==========================================
    // STEP 1: GET EMAIL & PASSWORD FROM REQUEST
    // ==========================================
    // Parse the JSON body from the request
    // Example: { email: "admin@school.com", password: "admin123" }
    const { email, password } = await request.json();

    // Validate that both fields are provided
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 } // 400 = Bad Request
      );
    }

    // ==========================================
    // STEP 2: QUERY DATABASE FOR USER
    // ==========================================
    // Search for user in the database by email
    const { data: user, error } = await supabase
      .from("users") // Table name
      .select("*") // Select all columns (id, email, password, name, role, etc.)
      .eq("email", email) // WHERE email = provided email
      .single(); // We expect only one result

    // If database query failed
    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { success: false, message: "Database error occurred" },
        { status: 500 } // 500 = Internal Server Error
      );
    }

    // If no user found with this email
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 } // 401 = Unauthorized
      );
    }

    // ==========================================
    // STEP 3: CHECK PASSWORD (PLAIN TEXT)
    // ==========================================
    // Compare passwords directly (no hashing - for learning only!)
    // In production, you would use bcrypt.compare() here
    if (password !== user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 } // 401 = Unauthorized
      );
    }

    // ==========================================
    // STEP 4: CREATE JWT TOKEN
    // ==========================================
    // User credentials are correct! Create a JWT token
    // This token will contain user info and be signed with our secret

    // Convert JWT_SECRET to Uint8Array (required by jose)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Create JWT token using jose (Edge Runtime compatible)
    const token = await new SignJWT({
      // Payload: Data to store in the token
      id: user.id, // User's unique ID
      email: user.email, // User's email
      name: user.name, // User's name
      role: user.role, // User's role (ADMIN, TEACHER, STUDENT) - IMPORTANT!
    })
      .setProtectedHeader({ alg: "HS256" }) // Algorithm: HMAC SHA-256
      .setExpirationTime("30d") // Token expires in 30 days
      .sign(secret); // Sign with our secret key

    // ==========================================
    // STEP 5: CREATE RESPONSE WITH COOKIE
    // ==========================================
    // Create a response with success message
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Send role to frontend for redirect
        },
      },
      { status: 200 } // 200 = OK
    );

    // ==========================================
    // STEP 6: SET JWT TOKEN IN httpOnly COOKIE
    // ==========================================
    // This is THE MOST IMPORTANT PART for authentication!
    // The JWT token is stored in a httpOnly cookie that:
    // 1. Cannot be accessed by JavaScript (secure)
    // 2. Is automatically sent with every request to the server
    // 3. Is used by middleware to verify user identity
    response.cookies.set("auth-token", token, {
      httpOnly: true, // Cannot be accessed by JavaScript (prevents XSS attacks)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days (in seconds)
      path: "/", // Cookie available for all routes
    });

    // ==========================================
    // STEP 7: RETURN SUCCESS RESPONSE
    // ==========================================
    // Send response back to the frontend
    // The frontend will use the 'role' to redirect to correct dashboard
    return response;
  } catch (error) {
    // ==========================================
    // CATCH ANY UNEXPECTED ERRORS
    // ==========================================
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 } // 500 = Internal Server Error
    );
  }
}

// ==============================================
// COMPLETE FLOW SUMMARY:
// ==============================================
// 1. User submits email + password from login form
// 2. This API receives the request
// 3. Query Supabase database for user by email
// 4. Check if password matches (plain text comparison)
// 5. Create JWT token with user info (including ROLE)
// 6. Store JWT in httpOnly cookie (secure, auto-sent with requests)
// 7. Return success response with user data
// 8. Frontend redirects based on role
// 9. All future requests include the cookie automatically
// 10. Middleware reads cookie and verifies JWT to protect routes
// ==============================================
