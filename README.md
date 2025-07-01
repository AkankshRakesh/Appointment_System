# 📅 Appointment Booking System

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
- ✅ **Basic Tests**: Jest test cases for critical API functions

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Data Storage**: In-memory (JavaScript objects)
- **Testing**: Jest, React Testing Library
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📁 Project Structure

\`\`\`
appointment-booking-system/
├── app/
│   ├── api/
│   │   ├── bookings/
│   │   │   ├── route.ts          # GET, POST /api/bookings
│   │   │   └── [id]/route.ts     # PATCH /api/bookings/:id
│   │   └── slots/
│   │       └── route.ts          # GET /api/slots
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main application page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── customer-booking.tsx      # Customer booking interface
│   └── client-dashboard.tsx      # Admin dashboard
├── lib/
│   └── data.ts                   # Data management & business logic
├── __tests__/
│   └── api/
│       └── bookings.test.js      # API tests
├── jest.config.js
├── jest.setup.js
├── package.json
└── README.md
\`\`\`

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd appointment-booking-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Running Tests
\`\`\`bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
\`\`\`

### Building for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 📊 API Endpoints

### Get Available Time Slots
\`\`\`
GET /api/slots
Response: Array of time slots with availability status
\`\`\`

### Get All Bookings
\`\`\`
GET /api/bookings
Response: Array of all bookings sorted by date
\`\`\`

### Create New Booking
\`\`\`
POST /api/bookings
Body: {
  slotId: string,
  customerName: string,
  customerEmail: string,
  reason: string
}
Response: Created booking object
\`\`\`

### Update Booking Status
\`\`\`
PATCH /api/bookings/:id
Body: { status: 'approved' | 'denied' }
Response: Updated booking object
\`\`\`

## 🎯 Sample API Calls

### Book an Appointment
\`\`\`bash
curl -X POST http://localhost:3000/api/bookings \\
  -H "Content-Type: application/json" \\
  -d '{
    "slotId": "slot_2024-01-15_09-00",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "reason": "Initial consultation"
  }'
\`\`\`

### Approve a Booking
\`\`\`bash
curl -X PATCH http://localhost:3000/api/bookings/booking_123 \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "approved" }'
\`\`\`

## 📋 Demo Data

The application automatically generates:
- **Time Slots**: Monday-Friday, 9 AM - 5 PM, 30-minute intervals
- **Sample Bookings**: 3 pre-populated bookings for demonstration
- **Mixed Statuses**: Pending, approved, and denied examples

## 🔧 Architecture Notes

### Data Management
- **In-Memory Storage**: All data stored in JavaScript objects
- **Automatic Initialization**: Time slots generated on server start
- **Data Persistence**: Data persists during server session
- **Conflict Prevention**: Robust double-booking prevention

### Error Handling
- **Input Validation**: Email format, required fields
- **Booking Conflicts**: Clear error messages for unavailable slots
- **Network Errors**: Graceful handling of API failures
- **User Feedback**: Toast notifications for all actions

### Performance Features
- **Live Updates**: Automatic polling every 30 seconds
- **Optimistic UI**: Immediate feedback on user actions
- **Responsive Design**: Mobile-first approach
- **Efficient Filtering**: Client-side filtering for instant results

## 🧪 Testing Strategy

The test suite covers:
- ✅ Successful booking creation
- ✅ Double-booking prevention
- ✅ Booking status updates
- ✅ Denied slot re-availability

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

Built with ❤️ for BloorTech Engineering Assessment
\`\`\`
