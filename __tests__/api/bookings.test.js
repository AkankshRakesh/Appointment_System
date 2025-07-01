/**
 * @jest-environment node
 */

import { createBooking, updateBookingStatus, getTimeSlots } from "../../lib/data"
import jest from "jest"

describe("Booking API", () => {
  beforeEach(() => {
    // Reset data before each test
    jest.resetModules()
  })

  test("should create a booking successfully", () => {
    const slots = getTimeSlots()
    const availableSlot = slots.find((slot) => slot.available)

    expect(availableSlot).toBeDefined()

    const bookingData = {
      slotId: availableSlot.id,
      customerName: "Test User",
      customerEmail: "test@example.com",
      reason: "Test appointment",
    }

    const result = createBooking(bookingData)

    expect(result.success).toBe(true)
    expect(result.booking).toBeDefined()
    expect(result.booking.customerName).toBe("Test User")
    expect(result.booking.status).toBe("pending")
  })

  test("should prevent double booking", () => {
    const slots = getTimeSlots()
    const availableSlot = slots.find((slot) => slot.available)

    const bookingData = {
      slotId: availableSlot.id,
      customerName: "Test User 1",
      customerEmail: "test1@example.com",
      reason: "First appointment",
    }

    // First booking should succeed
    const firstResult = createBooking(bookingData)
    expect(firstResult.success).toBe(true)

    // Second booking for same slot should fail
    const secondBookingData = {
      slotId: availableSlot.id,
      customerName: "Test User 2",
      customerEmail: "test2@example.com",
      reason: "Second appointment",
    }

    const secondResult = createBooking(secondBookingData)
    expect(secondResult.success).toBe(false)
    expect(secondResult.error).toBe("Time slot is already booked")
  })

  test("should update booking status", () => {
    const slots = getTimeSlots()
    const availableSlot = slots.find((slot) => slot.available)

    const bookingData = {
      slotId: availableSlot.id,
      customerName: "Test User",
      customerEmail: "test@example.com",
      reason: "Test appointment",
    }

    const createResult = createBooking(bookingData)
    expect(createResult.success).toBe(true)

    const updateResult = updateBookingStatus(createResult.booking.id, "approved")
    expect(updateResult.success).toBe(true)
    expect(updateResult.booking.status).toBe("approved")
  })

  test("should allow rebooking denied slots", () => {
    const slots = getTimeSlots()
    const availableSlot = slots.find((slot) => slot.available)

    const bookingData = {
      slotId: availableSlot.id,
      customerName: "Test User 1",
      customerEmail: "test1@example.com",
      reason: "First appointment",
    }

    // Create and deny booking
    const firstResult = createBooking(bookingData)
    expect(firstResult.success).toBe(true)

    const denyResult = updateBookingStatus(firstResult.booking.id, "denied")
    expect(denyResult.success).toBe(true)

    // Should be able to book the same slot again
    const secondBookingData = {
      slotId: availableSlot.id,
      customerName: "Test User 2",
      customerEmail: "test2@example.com",
      reason: "Second appointment",
    }

    const secondResult = createBooking(secondBookingData)
    expect(secondResult.success).toBe(true)
  })
})
