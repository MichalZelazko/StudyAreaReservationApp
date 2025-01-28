import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Reservation {
  ReservationTitle: string;
  ReservationStart: string;
  ReservationEnd: string;
}

const CurrentReservationDisplay = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const [nextReservation, setNextReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const now = new Date().toISOString();

        const { data, error } = await supabase
          .from("Reservations")
          .select("ReservationTitle, ReservationStart, ReservationEnd")
          .eq("AreaId", areaId)
          .order("ReservationStart", { ascending: true });

        if (error) throw error;

        const current = data.find(
          (reservation) =>
            new Date(reservation.ReservationStart) <= new Date(now) &&
            new Date(reservation.ReservationEnd) > new Date(now)
        );

        const next = data.find(
          (reservation) => new Date(reservation.ReservationStart) > new Date(now)
        );

        setCurrentReservation(current || null);
        setNextReservation(next || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [areaId]);

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
        </div>
      ) : (
        <p className="text-lg">No active reservation.</p>
      )}

      {nextReservation && (
        <div className="mt-6 text-center p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Next Reservation</h2>
          <p>
            <strong>Title:</strong> {nextReservation.ReservationTitle}
          </p>
          <p>
            <strong>Starts At:</strong> {new Date(nextReservation.ReservationStart).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentReservationDisplay;
