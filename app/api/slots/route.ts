import { NextResponse } from "next/server"
import { getTimeSlots } from "@/lib/data"

export async function GET() {
  try {
    const slots = getTimeSlots()
    return NextResponse.json(slots)
  } catch (error) {
    console.error("Error fetching slots:", error)
    return NextResponse.json({ error: "Failed to fetch time slots" }, { status: 500 })
  }
}
