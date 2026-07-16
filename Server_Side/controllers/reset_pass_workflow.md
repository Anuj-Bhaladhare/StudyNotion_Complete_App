This is the standard backend flow that most production applications follow. There are usually **three APIs** involved.

---

# Step 1: User clicks "Forgot Password"

### API

```
POST /auth/forgot-password
```

### Request

```json
{
    "email": "user@gmail.com"
}
```

### Backend Flow

```text
// Receive email

// Validate email

// Check whether user exists

// If user doesn't exist:
//     (Usually still return success to prevent email enumeration)

// Generate a secure random reset token

// Hash the reset token (recommended)

// Save hashed token and expiry time in database
// Example:
// reset_password_token
// reset_password_expires_at

// Create reset password URL
// Example:
// https://yourdomain.com/reset-password/<token>

// Send email containing the reset URL

// Return success response
```

---

# Database after API 1

Before

```
User
--------------------------
email
password_hash
```

After

```
User
--------------------------
email
password_hash
reset_password_token
reset_password_expires_at
```

Example

```
email: abc@gmail.com

reset_password_token:
9c5d8f2ab84....

expires_at:
2026-07-16 06:30 PM
```

---

# Step 2: User opens email

Email contains

```
Click here to reset password

https://yourdomain.com/reset-password/9c5d8f2ab84....
```

Notice

The frontend page opens.

Backend is **not** involved yet.

---

# Step 3: Frontend shows Reset Password page

User enters

```
New Password

Confirm Password
```

Then frontend calls

```
POST /auth/reset-password
```

---

# API 2

### Request

```json
{
    "token": "9c5d8f2ab84....",
    "password": "newPassword123",
    "confirm_password": "newPassword123"
}
```

---

# Backend Flow

```text
// Receive token and passwords

// Validate required fields

// Check password == confirm password

// Find user by reset token

// If token doesn't exist
//      Return Invalid Link

// Check token expiry

// If expired
//      Return Link Expired

// Hash new password using bcrypt

// Update password_hash

// Remove reset token

// Remove reset expiry

// Save changes

// Return Password Reset Successful
```

---

# Database after successful reset

Before

```
password_hash

reset_password_token

reset_password_expires_at
```

After

```
password_hash (new hash)

reset_password_token = NULL

reset_password_expires_at = NULL
```

The reset link cannot be reused.

---

# Complete Flow

```
Forgot Password

        │
        ▼

POST /forgot-password

        │

Generate Random Token

        │

Save Token + Expiry

        │

Send Email

        │

──────────────

User Opens Email

        │

Click Reset Link

        │

Frontend Opens Reset Page

        │

Enter New Password

        │

POST /reset-password

        │

Validate Token

        │

Check Expiry

        │

Hash Password

        │

Update Password

        │

Delete Token

        │

Success
```

---

# APIs Summary

### 1. Forgot Password

```
POST /auth/forgot-password
```

Input

```
email
```

Output

```
Password reset link sent.
```

---

### 2. Reset Password

```
POST /auth/reset-password
```

Input

```
token
new password
confirm password
```

Output

```
Password changed successfully.
```

---

## Security recommendations

Instead of storing the raw reset token in the database, a common practice is:

1. Generate a long random token using a cryptographically secure generator.
2. Send the **raw token** only in the email link.
3. Store **only a hash of that token** in the database.
4. When the user submits the token, hash the received token and compare it with the stored hash.

This way, even if someone gains read access to your database, they can't use the stored reset tokens to reset users' passwords.

This flow is the one commonly used by frameworks and services such as Laravel, Django, Spring Security, ASP.NET Identity, and many Node.js applications.
