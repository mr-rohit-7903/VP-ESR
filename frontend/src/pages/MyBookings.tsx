import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface Booking {
  _id: string;
  name: string;
  title: string;
  room: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface MyBookingsProps {
  currentUserName: string;
}

const API_BASE = 'http://localhost:5001/api/bookings';

export const MyBookings: React.FC<MyBookingsProps> = ({ currentUserName }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      console.log('📥 Fetching bookings for user:', currentUserName);

      const res = await fetch(API_BASE);
      console.log('📡 GET status:', res.status);

      if (!res.ok) throw new Error('Failed to fetch bookings');

      const data = await res.json();
      console.log('📦 Raw bookings from backend:', data);

      const mine = data.filter(
        (b: Booking) => b.name.toLowerCase() === currentUserName.toLowerCase()
      );

      console.log('✅ Filtered my bookings:', mine);
      setBookings(mine);
    } catch (err) {
      console.error('💥 Error loading my bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      console.log('🗑️ Cancelling booking:', id);

      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });

      console.log('📡 DELETE status:', res.status);

      if (!res.ok) throw new Error('Failed to cancel booking');

      setBookings((prev) => prev.filter((b) => b._id !== id));
      console.log('✅ Booking cancelled:', id);
    } catch (err) {
      console.error('💥 Error cancelling booking:', err);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, [currentUserName]);

  if (loading) return <div className="p-4">Loading your bookings...</div>;

  if (bookings.length === 0)
    return <div className="p-4 text-muted-foreground">You have no bookings yet.</div>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">📋 My Bookings</h2>

      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{b.room === 'esr' ? 'ESR Room' : 'VP Room'}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(b.startTime), 'PPPP')} —{' '}
                {format(new Date(b.startTime), 'HH:mm')} to{' '}
                {format(new Date(b.endTime), 'HH:mm')}
              </div>
              <div className="text-sm">{b.description || 'No description'}</div>
            </div>
            <Button
              variant="destructive"
              onClick={() => cancelBooking(b._id)}
            >
              Cancel
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
