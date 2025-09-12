import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Plus } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { RoomSelector } from './RoomSelector';
import { TimelineView } from './TimelineView';
import { BookingForm } from './BookingForm';

export interface Booking {
  id: string;
  name: string;
  title: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  room: string;      // "ESR Room" or "VP Room"
  date: Date;
  purpose?: string;
}

const API_BASE = 'http://localhost:5001/api/bookings';

const BookingTimeline = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState('ESR Room');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // ✅ GET bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const formattedDate = formatDate(selectedDate);
      console.log('📅 Fetching bookings for date:', formattedDate, 'and room:', selectedRoom);

      const res = await fetch(`${API_BASE}?date=${formattedDate}`);
      console.log('📡 GET status:', res.status);

      if (!res.ok) {
        console.error('❌ GET failed');
        return;
      }

      const data = await res.json();
      console.log('📥 Raw bookings from backend:', data);

      const transformed: Booking[] = data
        .filter((b: any) => {
          const roomName = b.room === 'esr' ? 'ESR Room' : 'VP Room';
          return roomName === selectedRoom;
        })
        .map((b: any) => ({
          id: b._id,
          name: b.name,
          title: b.title,
          startTime: new Date(b.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          endTime: new Date(b.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          room: b.room === 'esr' ? 'ESR Room' : 'VP Room',
          date: new Date(b.startTime),
          purpose: b.description
        }));

      console.log('✅ Transformed bookings for timeline:', transformed);
      setBookings(transformed);
    } catch (err) {
      console.error('💥 Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ POST new booking
  const handleBookingSubmit = async (bookingData: any) => {
    try {
      console.log('📤 Sending booking to backend:', bookingData);

      const body = {
        name: bookingData.name,
        title: bookingData.title,
        room: bookingData.room === 'ESR Room' ? 'esr' : 'vp',
        date: formatDate(bookingData.date),
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        description: bookingData.purpose || '',
      };

      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      console.log('📡 POST status:', res.status);

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || 'Failed to create booking');
        return;
      }

      const newBooking = await res.json();
      console.log('✅ Booking created successfully:', newBooking);

      // 🟢 Automatically switch to the date/room you just booked
      setSelectedDate(new Date(bookingData.date));
      setSelectedRoom(bookingData.room);

      await fetchBookings();
      setShowBookingForm(false);
    } catch (err) {
      console.error('💥 Error creating booking:', err);
    }
  };


  useEffect(() => {
    console.log('📌 Selected date changed:', selectedDate);
    console.log('📌 Selected room changed:', selectedRoom);
    fetchBookings();
  }, [selectedDate, selectedRoom]);

  const handleRefresh = () => {
    console.log('🔁 Manual refresh clicked');
    fetchBookings();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Room Booking Timeline</h1>
            <p className="text-muted-foreground mt-1">
              Timeline for booking ESR and VP room • Book available slots instantly
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={handleRefresh}
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              onClick={() => setShowBookingForm(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md font-medium">
                Section 1
              </span>
            </div>
            <DatePicker 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md font-medium">
                Section 2
              </span>
            </div>
            <RoomSelector 
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
            />
          </Card>
        </div>

        {/* Timeline View */}
        <Card className="p-6">
          <TimelineView 
            selectedDate={selectedDate}
            selectedRoom={selectedRoom}
            bookings={bookings}
          />
        </Card>

        {/* Booking Form Dialog */}
        <BookingForm 
          open={showBookingForm}
          onOpenChange={setShowBookingForm}
          onSubmit={handleBookingSubmit}
        />
      </div>
    </div>
  );
};

export default BookingTimeline;
