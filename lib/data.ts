import { addDays, format, startOfWeek, setHours, setMinutes } from "date-fns"

export interface TimeSlot {
  id: string
  datetime: string
  available: boolean
}

export interface Booking {
  id: string
  slotId: string
  datetime: string
  customerName: string
  customerEmail: string
  reason: string
  status: "pending" | "approved" | "denied"
  createdAt: string
}

// In-memory storage
let timeSlots: TimeSlot[] = []
const bookings: Booking[] = []

// Initialize time slots for the week (Monday to Friday, 9 AM to 5 PM, 30-minute intervals)
function initializeTimeSlots() {
  if (timeSlots.length > 0) return // Already initialized

  const slots: TimeSlot[] = []
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday

  // Generate slots for Monday to Friday
  for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
    const currentDay = addDays(startOfCurrentWeek, dayOffset)

    // 9 AM to 5 PM (17:00), 30-minute intervals
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = setMinutes(setHours(currentDay, hour), minute)

        slots.push({
          id: `slot_${format(slotTime, "yyyy-MM-dd_HH-mm")}`,
          datetime: slotTime.toISOString(),
          available: true,
        })
      }
    }
  }

  timeSlots = slots
  console.log(`✅ Initialized ${slots.length} time slots for the week`)
}

// Initialize on module load
initializeTimeSlots()

export function getTimeSlots(): TimeSlot[] {
  return timeSlots.map((slot) => ({
    ...slot,
    available: !bookings.some((booking) => booking.slotId === slot.id && booking.status !== "denied"),
  }))
}

export function getBookings(): Booking[] {
  return [...bookings].sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
}

export function createBooking(data: {
  slotId: string
  customerName: string
  customerEmail: string
  reason: string
}): { success: boolean; booking?: Booking; error?: string } {
  // Find the slot
  const slot = timeSlots.find((s) => s.id === data.slotId)
  if (!slot) {
    return { success: false, error: "Invalid time slot" }
  }

  // Check if slot is already booked (not denied)
  const existingBooking = bookings.find((b) => b.slotId === data.slotId && b.status !== "denied")
  if (existingBooking) {
    return { success: false, error: "Time slot is already booked" }
  }

  // Create new booking
  const booking: Booking = {
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    slotId: data.slotId,
    datetime: slot.datetime,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    reason: data.reason,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  bookings.push(booking)
  return { success: true, booking }
}

export function updateBookingStatus(
  bookingId: string,
  status: "approved" | "denied",
): { success: boolean; booking?: Booking; error?: string } {
  const bookingIndex = bookings.findIndex((b) => b.id === bookingId)

  if (bookingIndex === -1) {
    return { success: false, error: "Booking not found" }
  }

  bookings[bookingIndex].status = status
  return { success: true, booking: bookings[bookingIndex] }
}

// Seed some sample data for demonstration
export function seedSampleData() {
  if (bookings.length > 0) return // Already seeded

  const sampleBookings = [
    {
      slotId: timeSlots[0]?.id,
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      reason: "Initial consultation for web development project",
    },
    {
      slotId: timeSlots[5]?.id,
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      reason: "Follow-up meeting for mobile app design",
    },
    {
      slotId: timeSlots[10]?.id,
      customerName: "Mike Johnson",
      customerEmail: "mike.johnson@example.com",
      reason: "Technical discussion about API integration",
    },
  ]

  sampleBookings.forEach((booking) => {
    if (booking.slotId) {
      createBooking(booking)
    }
  })

  // Approve one booking for demonstration
  if (bookings.length > 0) {
    updateBookingStatus(bookings[0].id, "approved")
  }

  console.log(`✅ Seeded ${bookings.length} sample bookings`)
}

// Seed sample data on initialization
seedSampleData()
