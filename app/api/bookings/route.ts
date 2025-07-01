import { type NextRequest, NextResponse } from "next/server"
import { getBookings, createBooking } from "@/lib/data"

export async function GET() {
  try {
    const bookings = getBookings()
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slotId, customerName, customerEmail, reason } = body

    // validation
    if (!slotId || !customerName || !customerEmail || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const result = createBooking({
      slotId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      reason: reason.trim(),
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // simulate calendar invite (log to console)
    console.log(`📅 Calendar Invite Sent:
      To: ${customerEmail}
      Subject: Appointment Confirmation
      Details: ${reason}
      Time: ${new Date(result.booking!.datetime).toLocaleString()}
    `)

    return NextResponse.json(result.booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
