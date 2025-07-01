# 📅 BookHub

A full-stack appointment booking application built with Next.js, React, and TypeScript. This system allows customers to book appointments and business owners to manage their bookings efficiently.

## 🚀 Features

### Customer Side
- ✅ View available appointment slots for the week
- ✅ Book appointments with name, email, and reason
- ✅ Prevent double-booking with real-time validation
- ✅ Clear success/error feedback
- ✅ Responsive design for all devices

### Client Side (Business Admin)
- ✅ View all booked appointments
- ✅ Approve or deny appointments (pending by default)
- ✅ Filter appointments by status (pending/approved/denied)
- ✅ Export bookings to CSV
- ✅ Live updates with automatic polling
- ✅ Dashboard with booking statistics

### Backend API
- ✅ RESTful API endpoints
- ✅ Proper error handling and validation
- ✅ In-memory data storage
- ✅ Automatic time slot generation
- ✅ Booking conflict prevention

### Extra Credit Features
- ✅ **Calendar Sync**: Simulated email/calendar invites (console logs)
- ✅ **CSV Export**: Download all bookings as CSV file
- ✅ **Live Updates**: Auto-refresh every 30 seconds

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Data Storage**: In-memory (JavaScript objects)
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📁 Project Structure

```
Directory structure:
└── appointment_system/
    ├── README.md
    ├── components.json
    ├── jest.config.js
    ├── jest.setup.js
    ├── next.config.mjs
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── api/
    │       ├── bookings/
    │       │   ├── route.ts
    │       │   └── [id]/
    │       │       └── route.ts
    │       └── slots/
    │           └── route.ts
    ├── components/
    │   ├── client-dashboard.tsx
    │   ├── customer-booking.tsx
    │   └── theme-provider.tsx
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   ├── data.ts
    │   └── utils.ts
    ├── storage/
    │   └── bookings.json
    └── styles/
        └── globals.css
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkankshRakesh/Appointment_System
   cd appointment_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Running Tests
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Building for Production
```bash
npm run build
npm start
```

## 📊 API Endpoints

### Get Available Time Slots
```
GET /api/slots
Response: Array of time slots with availability status
```

### Get All Bookings
```
GET /api/bookings
Response: Array of all bookings sorted by date
```

### Create New Booking
```
POST /api/bookings
Body: {
  slotId: string,
  customerName: string,
  customerEmail: string,
  reason: string
}
Response: Created booking object
```

### Update Booking Status
```
PATCH /api/bookings/:id
Body: { status: 'approved' | 'denied' }
Response: Updated booking object
```

## 🎯 Sample API Calls

### Book an Appointment
```bash
curl -X POST http://localhost:3000/api/bookings \\
  -H "Content-Type: application/json" \\
  -d '{
    "slotId": "slot_2024-01-15_09-00",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "reason": "Initial consultation"
  }'
```

### Approve a Booking
```bash
curl -X PATCH http://localhost:3000/api/bookings/booking_123 \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "approved" }'
```

## 📋 Demo Data

The application automatically generates:
- **Time Slots**: Monday-Friday, 9 AM - 5 PM, 30-minute intervals
- **Sample Bookings**: 2 pre-populated bookings for demonstration
- **Mixed Statuses**: Pending, approved, and denied examples

## 🔧 Architecture Notes

### Data Management
- **In-Memory Storage**: All booking data is stored in JSON in storage folder
- **Automatic Initialization**: Time slots generated on server start
- **Data Persistence**: Data persists during server session
- **Conflict Prevention**: Robust double-booking prevention

### Error Handling
- **Input Validation**: Email format, required fields
- **Booking Conflicts**: Clear error messages for unavailable slots
- **Network Errors**: Graceful handling of API failures
- **User Feedback**: Proper notifications for all actions

### Performance Features
- **Live Updates**: Automatic polling every 30 seconds
- **Optimistic UI**: Immediate feedback on user actions
- **Responsive Design**: Mobile-first approach
- **Efficient Filtering**: Client-side filtering for instant results

## 🎨 UI/UX Features

- **Tabbed Interface**: Easy switching between customer and admin views
- **Status Badges**: Color-coded booking statuses
- **Statistics Dashboard**: Quick overview of booking metrics
- **Responsive Tables**: Mobile-friendly data display
- **Loading States**: Clear feedback during API calls
- **Error Handling**: User-friendly error messages

## 🚀 Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- Email notifications with real SMTP
- Calendar integration (Google Calendar, Outlook)
- Recurring appointments
- Time zone support
- Payment integration
- Advanced reporting and analytics

## 📝 Development Notes

This project demonstrates:
- **Clean Architecture**: Separation of concerns
- **Type Safety**: Full TypeScript implementation
- **Modern React**: Hooks, functional components
- **API Design**: RESTful endpoints with proper HTTP methods
- **Error Handling**: Comprehensive validation and error responses
- **Testing**: Unit tests for critical business logic
- **Documentation**: Clear README and code comments

---
