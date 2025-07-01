import { type NextRequest, NextResponse } from "next/server"
import { updateBookingStatus } from "@/lib/data"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body
    const bookingId = params.id

    if (!status || !["approved", "denied"].includes(status)) {
      return NextResponse.json({ error: 'Invalid status. Must be "approved" or "denied"' }, { status: 400 })
    }

    const result = updateBookingStatus(bookingId, status)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 })
    }

    // Simulate email notification (log to console)
    console.log(`📧 Email Notification Sent:
      To: ${result.booking!.customerEmail}
      Subject: Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}
      Message: Your appointment has been ${status}.
    `)

    return NextResponse.json(result.booking)
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}
