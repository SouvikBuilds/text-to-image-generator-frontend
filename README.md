MERN Stack API Integration Guide - Imagify Project
📋 Overview
Complete step-by-step guide for connecting backend APIs with frontend components in a MERN image generation application.

🔧 Backend API Endpoints
User Authentication APIs (/api/v1/users)
POST /register - User registration

POST /login - User login

POST /logout - User logout

GET / - Get current user

GET /credit - Get user credits

Image Generation API (/api/v1/images)
POST /generate - Generate image from prompt

🚀 Frontend Integration Steps
Step 1: Setup Context for Global State
File: AppContext.jsx

import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
const [user, setUser] = useState(null);
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [credit, setCredit] = useState(0);

// Check if user is logged in on app load
const checkAuthStatus = async () => {
try {
const response = await fetch(`${backendUrl}/api/v1/users/`, {
credentials: 'include'
});
const data = await response.json();
if (data.success) {
setUser(data.data);
}
} catch (error) {
console.error('Auth check failed:', error);
}
};

useEffect(() => {
checkAuthStatus();
}, []);

const value = { user, setUser, backendUrl, credit, setCredit };
return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

Copy
javascript
Step 2: User Registration Integration
File: Signup.jsx

import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const handleSignup = async (e) => {
e.preventDefault();
const formData = new FormData(e.target);
const name = formData.get('name');
const email = formData.get('email');
const password = formData.get('password');

try {
const response = await fetch(`${backendUrl}/api/v1/users/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email, password })
});

    const data = await response.json();
    if (data.success) {
      navigate('/login');
    }

} catch (error) {
console.error('Signup failed:', error);
}
};

// Form with proper name attributes
<input type="text" name="name" required />
<input type="email" name="email" required />
<input type="password" name="password" required />

<form onSubmit={handleSignup}>

Copy
javascript
Step 3: User Login Integration
File: Login.jsx

const handleLogin = async (e) => {
e.preventDefault();
const formData = new FormData(e.target);
const email = formData.get('email');
const password = formData.get('password');

try {
const response = await fetch(`${backendUrl}/api/v1/users/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
body: JSON.stringify({ email, password })
});

    const data = await response.json();
    if (data.success) {
      setUser(data.data.user);
      navigate('/');
    }

} catch (error) {
console.error('Login failed:', error);
}
};

Copy
javascript
Step 4: Navbar with Credits & Logout
File: Navbar.jsx

const fetchUserCredit = async () => {
if (!user) return;
try {
const response = await fetch(`${backendUrl}/api/v1/users/credit?userId=${user._id}`, {
credentials: 'include'
});
const data = await response.json();
if (data.success) {
setCredit(data.data.credit);
}
} catch (error) {
console.error('Failed to fetch credit:', error);
}
};

const handleLogout = async () => {
try {
await fetch(`${backendUrl}/api/v1/users/logout`, {
method: 'POST',
credentials: 'include'
});
setUser(null);
navigate('/');
} catch (error) {
console.error('Logout failed:', error);
}
};

// Display user info

<p>Hi {user?.name}</p>
<p>Credit Left: {credit || 0}</p>
<li onClick={handleLogout}>Logout</li>

Copy
javascript
Step 5: Image Generation Integration
File: Result.jsx

const onSubmitHandler = async (e) => {
e.preventDefault();
if (!user) {
alert('Please log in to generate images');
return;
}
if (!input.trim()) {
alert('Please enter a prompt');
return;
}
if (credit === 0) {
navigate('/buy-credit');
return;
}

setIsLoading(true);

try {
const response = await fetch(
`${backendUrl}/api/v1/images/generate?userId=${user._id}`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
credentials: "include",
body: JSON.stringify({ prompt: input }),
}
);

    const data = await response.json();

    if (data.success) {
      setImage(data.data.image);
      setIsImageLoaded(true);
      setCredit(data.data.creditBalance);
    }

} catch (error) {
console.error("Image generation failed:", error);
} finally {
setIsLoading(false);
}
};

// Credit check for "Generate Another"
onClick={() => {
if (credit === 0) {
navigate('/buy-credit');
} else {
setIsImageLoaded(false);
}
}}

Copy
javascript
Step 6: Backend Image Processing Fix
File: image.controller.js

const { data } = await axios.post(
"https://clipdrop-api.co/text-to-image/v1",
formData,
{
headers: {
"x-api-key": process.env.CLIPDROP_API_KEY,
"Content-Type": "multipart/form-data",
},
responseType: 'arraybuffer' // Key fix for binary data
}
);

const base64Image = Buffer.from(data).toString("base64");
const resultImage = `data:image/png;base64,${base64Image}`;

Copy
javascript
🔄 Complete Workflow
App Load → Check auth status → Set user if logged in

Signup → POST /register → Redirect to login

Login → POST /login → Set user context → Redirect to home

Navbar → Fetch credits → Display user info

Image Generation → Check credits → POST /generate → Update image & credits

Logout → POST /logout → Clear user context

🔑 Key Integration Points
Form Handling
// Always use FormData for form submissions
const formData = new FormData(e.target);
const email = formData.get('email');

// Ensure inputs have name attributes
<input name="email" type="email" />

Copy
javascript
API Calls
// Include credentials for authenticated requests
credentials: 'include'

// Proper error handling
if (data.success) {
// Handle success
} else {
// Handle API errors
}

Copy
javascript
State Management
// Update global state after API calls
setUser(data.data.user);
setCredit(data.data.creditBalance);

Copy
javascript
📝 Environment Setup
Frontend .env:

VITE_BACKEND_URL="http://localhost:4000"

Copy
Backend .env:

CLIPDROP_API_KEY=your_api_key_here

Copy
✅ Final Result
✅ Complete user authentication flow

✅ Real-time credit tracking

✅ Image generation with credit deduction

✅ Automatic redirect to pricing when credits = 0

✅ Proper error handling and user feedback

@Pin Context
+1
