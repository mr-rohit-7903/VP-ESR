import React, { useState } from 'react';
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
  startTime: string;
  endTime: string;
  room: string;
  date: Date;
  purpose?: string;
}

const BookingTimeline = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 15)); // September 15, 2025
  const [selectedRoom, setSelectedRoom] = useState('ESR Room');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([
    {
    id: '1',
    name: 'Daksh Yadav',
    title: 'Technology Coordinator',
    startTime: '00:00',
    endTime: '03:00',
    room: 'ESR Room',
    date: new Date(2025, 8, 15),
    purpose: 'Weekly technology review meeting'
  },
  {
    id: '2',
    name: 'Devansh Soni',
    title: 'Technology Coordinator',
    startTime: '12:00',
    endTime: '13:00',
    room: 'ESR Room',
    date: new Date(2025, 8, 15),
    purpose: 'Technology planning session'
  },
  {
    id: '3',
    name: 'Rohit Bej',
    title: 'Secretary Web',
    startTime: '14:00',
    endTime: '15:00',
    room: 'ESR Room',
    date: new Date(2025, 8, 15),
    purpose: 'Web department discussion'
  },
  {
    id: '4',
    name: 'Piyush Dubey',
    title: 'Secretary Web',
    startTime: '15:00',
    endTime: '17:00',
    room: 'VP Room',
    date: new Date(2025, 8, 15),
  }
  ]);

  const handleRefresh = () => {
    console.log('Refreshing timeline...');
  };

  const handleNewBooking = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (bookingData: any) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      name: bookingData.name,
      title: bookingData.title,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      room: bookingData.room,
      date: bookingData.date,
      purpose: bookingData.purpose,
    };
    
    setBookings(prev => [...prev, newBooking]);
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
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              onClick={handleNewBooking}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Date Picker */}
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

          {/* Section 2: Room Selector */}
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
            bookings={bookings.filter(booking => 
              booking.room === selectedRoom && 
              booking.date.toDateString() === selectedDate.toDateString()
            )}
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