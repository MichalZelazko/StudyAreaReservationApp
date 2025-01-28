import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Reservation {
  ReservationId: number;
  ReservationTitle: string;
  ReservationStart: string;
  ReservationEnd: string;
  ConfirmationCode: string; // Added this field to match database schema
  IsPresent: boolean; // Added this field to update presence
}

const CurrentReservationDisplay = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const now = new Date().toISOString();

        const { data, error } = await supabase
          .from("Reservations")
          .select("ReservationId, ReservationTitle, ReservationStart, ReservationEnd, ConfirmationCode, IsPresent")
          .eq("AreaId", areaId)
          .order("ReservationStart", { ascending: true });

        if (error) throw error;

        const current = data.find(
          (reservation) =>
            new Date(reservation.ReservationStart) <= new Date(now) &&
            new Date(reservation.ReservationEnd) > new Date(now)
        );

        setCurrentReservation(current || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [areaId, isConfirmed]);

  const handleConfirmPresence = async () => {
    if (!confirmationCode) {
      alert("Please enter a valid confirmation code.");
      return;
    }

    if (confirmationCode !== currentReservation?.ConfirmationCode) {
      alert("Invalid confirmation code.");
      return;
    }

    try {
      const { error } = await supabase
        .from("Reservations")
        .update({ IsPresent: true })
        .eq("AreaId", areaId)
        .eq("ReservationId", currentReservation.ReservationId) // Match the specific reservation
        .eq("ConfirmationCode", confirmationCode);

      if (error) throw error;

      alert("Your presence has been confirmed successfully!");
      setIsConfirmed(true); // Triggers UI update
    } catch (err) {
      console.error("Error confirming presence:", err);
      alert("Failed to confirm presence. Please try again.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Current Reservation</h1>
      {currentReservation ? (
        <div className="text-center p-4 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {currentReservation.ReservationTitle}
          </h2>
          <p>
            <strong>Ends At:</strong> {new Date(currentReservation.ReservationEnd).toLocaleTimeString()}
          </p>
          <input
            type="text"
            placeholder="Enter confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="mt-4 w-full p-2 border rounded"
          />
          <button
            onClick={handleConfirmPresence}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          >
            Confirm Presence
          </button>
        </div>
      ) : (
        <p className="text-lg">No active reservation.</p>
      )}
    </div>
  );
};

export default CurrentReservationDisplay;
