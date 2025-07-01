"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { format, parseISO } from "date-fns"

interface TimeSlot {
  id: string
  datetime: string
  available: boolean
}

interface BookingForm {
  name: string
  email: string
  reason: string
}

export default function CustomerBooking() {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    reason: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      const response = await fetch("/api/slots")
      const data = await response.json()
      setSlots(data)
    } catch (error) {
      console.error("Failed to fetch slots:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedSlot) {
      setMessage({ type: "error", text: "Please select a time slot" })
      return
    }

    if (!form.name || !form.email || !form.reason) {
      setMessage({ type: "error", text: "Please fill in all fields" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slotId: selectedSlot,
          customerName: form.name,
          customerEmail: form.email,
          reason: form.reason,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: "Appointment booked successfully!" })
        setForm({ name: "", email: "", reason: "" })
        setSelectedSlot("")
        fetchSlots() // Refresh slots
      } else {
        setMessage({ type: "error", text: data.error || "Failed to book appointment" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const groupSlotsByDate = (slots: TimeSlot[]) => {
    const grouped: { [key: string]: TimeSlot[] } = {}

    slots.forEach((slot) => {
      const date = format(parseISO(slot.datetime), "yyyy-MM-dd")
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(slot)
    })

    return grouped
  }

  const groupedSlots = groupSlotsByDate(slots)

  return (
    <div className="space-y-6">
      {message && (
        <Alert className={message.type === "error" ? "border-destructive" : "border-green-500"}>
          {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Available Time Slots
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(groupedSlots).map(([date, daySlots]) => (
              <Card key={date}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{format(parseISO(date), "EEEE, MMMM d, yyyy")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {daySlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedSlot === slot.id ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.id)}
                        className="justify-start"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {format(parseISO(slot.datetime), "h:mm a")}
                        {!slot.available && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            Booked
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Booking Details</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason for Appointment</Label>
              <Textarea
                id="reason"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="Briefly describe the reason for your appointment"
                rows={3}
                required
              />
            </div>

            {selectedSlot && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Selected Time:</p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    parseISO(slots.find((s) => s.id === selectedSlot)?.datetime || ""),
                    "EEEE, MMMM d, yyyy 'at' h:mm a",
                  )}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Book Appointment
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
