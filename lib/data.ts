import fs from "fs"
import path from "path"
import { addDays, format, setHours, setMinutes } from "date-fns"

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

// ----------- File paths -----------
const BOOKINGS_FILE = path.join(process.cwd(), "storage", "bookings.json")

// ----------- In-memory timeslot (generated fresh) -----------
let timeSlots: TimeSlot[] = []

function initializeTimeSlots() {
  if (timeSlots.length > 0) return

  const slots: TimeSlot[] = []
  const today = new Date()

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const currentDay = addDays(today, dayOffset)

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
}

// ----------- File helpers -----------
function readBookings(): Booking[] {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8")
    return JSON.parse(data) as Booking[]
  } catch (err) {
    console.error("❌ Failed to read bookings:", err)
    return []
  }
}

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2))
}

// ----------- Public APIs -----------

export function getTimeSlots(): TimeSlot[] {
  const bookings = readBookings()

  return timeSlots.map((slot) => ({
    ...slot,
    available: !bookings.some((booking) => booking.slotId === slot.id && booking.status !== "denied"),
  }))
}

export function getBookings(): Booking[] {
  return readBookings().sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
  )
}

export function createBooking(data: {
  slotId: string
  customerName: string
  customerEmail: string
  reason: string
}): { success: boolean; booking?: Booking; error?: string } {
  const bookings = readBookings()

  const slot = timeSlots.find((s) => s.id === data.slotId)
  if (!slot) return { success: false, error: "Invalid time slot" }

  const existing = bookings.find((b) => b.slotId === data.slotId && b.status !== "denied")
  if (existing) return { success: false, error: "Slot already booked" }

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
  writeBookings(bookings)

  return { success: true, booking }
}

export function updateBookingStatus(
  bookingId: string,
  status: "approved" | "denied",
): { success: boolean; booking?: Booking; error?: string } {
  const bookings = readBookings()
  const index = bookings.findIndex((b) => b.id === bookingId)

  if (index === -1) return { success: false, error: "Booking not found" }

  bookings[index].status = status
  writeBookings(bookings)

  return { success: true, booking: bookings[index] }
}

// ----------- Init on load -----------
initializeTimeSlots()
