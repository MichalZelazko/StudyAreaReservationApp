import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const CancelReservationPage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const reservationId = searchParams.get("reservationId");

  useEffect(() => {
    const deleteReservation = async () => {
      if (!reservationId) {
        setError("No reservation ID provided.");
        return;
      }

      const numericReservationId = Number(reservationId);

      if (isNaN(numericReservationId)) {
        setError("Invalid reservation ID.");
        return;
      }

      try {
        // Perform the deletion in Supabase
        const { error } = await supabase
          .from("Reservations")
          .delete()
          .eq("ReservationId", numericReservationId);

        if (error) {
          throw new Error(error.message); // Handle any errors returned by Supabase
        }

        // If no error occurred, the deletion was successful
        setSuccess(true); // Successfully deleted the reservation
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete reservation.");
      }
    };

    deleteReservation();
  }, [reservationId]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4">Delete Reservation</h2>
      {success && <p className="text-green-500">Your reservation has been successfully deleted.</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CancelReservationPage;
