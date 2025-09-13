import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Booking {
  _id: string;
  title: string;        // Position / Title
  room: string;
  startTime: string;
  endTime: string;
  name: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const userName = "Roshil Singh";

  const fetchMyBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:5001/api/bookings/myBookings?name=${encodeURIComponent(userName)}`
      );
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      // console.log("Fetched bookings:", data);
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
      background: "#1f2937",
      color: "#f3f4f6",
    });

    if (!confirm.isConfirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5001/api/bookings?_id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setBookings((prev) => prev.filter((b) => b._id !== id));

      Swal.fire({
        title: "Cancelled!",
        text: "Your booking has been cancelled.",
        icon: "success",
        background: "#1f2937",
        color: "#f3f4f6",
        confirmButtonColor: "#3b82f6",
      });
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "Delete failed",
        icon: "error",
        background: "#1f2937",
        color: "#f3f4f6",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        My Bookings
      </h1>

      {loading && <p>Loading your bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-gray-400">No bookings found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col gap-3"
          >
            <div>
              <h2 className="text-xl font-bold text-white">{booking.name}</h2>
              <p className="text-sm text-gray-400">{booking.title}</p>
            </div>

            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <span className="font-medium text-gray-200">Room:</span> {booking.room}
              </p>
              <p>
                <span className="font-medium text-gray-200">Date:</span>{" "}
                {new Date(booking.startTime).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-200">Time:</span>{" "}
                {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <button
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold disabled:opacity-50 transition-colors"
              onClick={() => handleDelete(booking._id)}
              disabled={deletingId === booking._id}
            >
              {deletingId === booking._id ? "Cancelling..." : "Cancel Booking"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
