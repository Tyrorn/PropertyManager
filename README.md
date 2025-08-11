# Keyhook Viewing Booking System - Proof of Concept

## 📋 Overview

This is a **Proof of Concept** (POC) project for a property viewing booking system, designed for **property managers (PMs)** and **tenants**.  
It demonstrates the core functionality of managing property availabilities, booking viewings, and linking tenants to bookings.

The goal was to validate the technical feasibility of the system before full-scale production development.

---

## 🚀 Features

- **Property Manager Availability Management**
  - PMs can set and view their availability.
- **Tenant Booking**
  - Tenants can book available slots with a PM.
- **Linked Property Details**
  - Bookings are associated with property information (ID and address).
- **Contact Details**
  - Tenant name and contact number linked to booking records.
- **Secure User Authentication**
  - User passwords are not returned to the frontend.

---

## 🛠 Tech Stack

**Frontend:**

- React
- TypeScript
- Vite
- Tailwind CSS

**Backend:**

- Node.js
- Express
- Prisma ORM
- SQLite (via Prisma)

**Other Tools:**

- VS Code (development)
- Git & GitHub (version control)
- npm (package management)

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Tyrorn/PropertyManager.git
# Start the backend
cd server
npm install
npx prisma migrate dev
npm run dev

# Start the frontend
cd ../keyhook
npm
npm run dev
```

## Steps to Make it Production Ready

1. UI/UX
   a. Improve CSS of dashboard components and add as a tab in a dashboard for the user.
   b. Allow Tenants and Property managers the ability to cancel availabilities and bookings.
   c. Improve CSS
   d. Store user data in React Context for cleaner state management.

2. Security
   a. Remove buttons which currently simply the user logins
   b. Add new login functionality to request username and password
   c. Add sanitization
   d. Validate API calls per user permissions.

3. Testing
   a. Implement unit tests
   b. Optionally implement integration tests
