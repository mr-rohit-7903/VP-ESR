import React, { useEffect, useState } from "react";

interface Booking {
  _id: string;
  title: string;
  description: string;
  room: string;
  startTime: string;
  endTime: string;
  name: string; // make sure this matches your DB field
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 🔹 Change this to the logged-in user's name
  const userName = "John Doe";

  const fetchMyBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:5001/api/bookings/my?name=${encodeURIComponent(userName)}`
      );
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      console.log("Fetched bookings:", data); // debug log
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5001/api/bookings?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">📋 My Bookings</h1>

      {loading && <p>Loading your bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-gray-400">No bookings found.</p>
      )}

      <div className="grid gap-4 mt-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 flex flex-col gap-2"
          >
            <h2 className="text-xl font-semibold">{booking.title}</h2>
            <p className="text-gray-300">{booking.description}</p>
            <p>
              <span className="font-medium">Room:</span> {booking.room}
            </p>
            <p>
              <span className="font-medium">Start:</span>{" "}
              {new Date(booking.startTime).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">End:</span>{" "}
              {new Date(booking.endTime).toLocaleString()}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold disabled:opacity-50"
              onClick={() => handleDelete(booking._id)}
              disabled={deletingId === booking._id}
            >
              {deletingId === booking._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
