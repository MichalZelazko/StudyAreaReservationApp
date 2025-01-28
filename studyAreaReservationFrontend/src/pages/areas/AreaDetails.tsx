import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { sendConfirmationEmail } from './mailjetService'; // Import your email service
import emailjs from 'emailjs-com'; // Import EmailJS

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface Reservation {
  ReservationId: number;
  AreaId: number;
  ReservationTitle: string;
  ReservationStart: string;
  ReservationEnd: string;
  IsConfirmed: boolean;
  UserEmail: string; // Assuming you have UserEmail instead of UserUUID
}

const AreaDetailsPage = () => {
  const { id, areaId } = useParams<{ id: string; areaId: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data, error } = await supabase
          .from("Reservations")
          .select("*")
          .eq("AreaId", areaId);

        if (error) throw error;

        const transformedEvents = data.map((reservation: Reservation) => ({
          title: reservation.ReservationTitle,
          start: new Date(reservation.ReservationStart),
          end: new Date(reservation.ReservationEnd),
        }));

        setEvents(transformedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [areaId, modalOpen]);

  // Function to check if the selected slot overlaps with any existing events
  const handleSelecting = (slot: { start: Date; end: Date }) => {
    return !events.some(
      (event) =>
        (slot.start >= event.start && slot.start < event.end) || // Overlaps at start
        (slot.end > event.start && slot.end <= event.end) || // Overlaps at end
        (slot.start <= event.start && slot.end >= event.end) // Completely overlaps
    );
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setSelectedSlot({ start, end });
    setModalOpen(true);
  };

const handleConfirmReservation = async () => {
  if (!agreeToTerms) {
    alert("You must agree to the terms and privacy policy to continue.");
    return;
  }

  if (!email) {
    alert("Please provide an email address.");
    return;
  }

  try {
    const reservationStart = selectedSlot?.start.toISOString();
    const reservationEnd = selectedSlot?.end.toISOString();

    // Insert the reservation into Supabase
    const { data, error } = await supabase
      .from("Reservations") // Replace with your actual table name
      .insert([
        {
          AreaId: areaId,
          ReservationTitle: "New Reservation", // Replace with actual title if needed
          ReservationStart: reservationStart,
          ReservationEnd: reservationEnd,
          IsConfirmed: true,
          UserEmail: email, // Make sure this field exists in your table
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error details:", error);
      throw new Error("Failed to insert reservation");
    }

    // Prepare reservation details for email
    const reservationDetails = {
      date: format(selectedSlot!.start, "MMMM dd, yyyy"), // Human-readable date
      time: `${format(selectedSlot!.start, "HH:mm")} - ${format(selectedSlot!.end, "HH:mm")}`,
      reservationId: data.ReservationId,
    };

    // Send email with EmailJS
    await emailjs.send(
      'service_kpu67ef', // Replace with your EmailJS service ID
      'template_nkhuemn', // Replace with your EmailJS template ID
      {
        user_email: email, // Template variable for the user's email
        reservation_date: reservationDetails.date, // Template variable for reservation date
        reservation_time: reservationDetails.time, // Template variable for reservation time
        reservation_id: reservationDetails.reservationId, // Template variable for reservation ID
      },
      'O44ivGo8Y108ZrKWA' // Replace with your EmailJS public key
    );

    // Success: Update UI or notify the user
    alert("Reservation confirmed! A confirmation email has been sent.");
    setModalOpen(false);
    setSelectedSlot(null);
    setEmail("");
    setAgreeToTerms(false);
  } catch (err) {
    console.error("Error confirming reservation:", err);
    alert("Failed to confirm reservation. Please try again.");
  }
};

  

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSlot(null);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col flex-grow p-6">
      <h2 className="text-2xl font-bold">Area Availability</h2>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold my-2">Availability Calendar</h3>
        <div
          className={`flex flex-grow items-center justify-center rounded-lg border p-4 ${
            modalOpen ? "pointer-events-none" : ""
          }`}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable="ignoreEvents"  // Optional if you want to use custom selection logic
            onSelecting={handleSelecting}  // Use the function to validate slot selection
            onSelectSlot={handleSelectSlot}
            defaultView="week"
            style={{ height: 500, width: "100%" }}
          />
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Confirm Reservation"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a semi-transparent overlay
            zIndex: 999, // Ensures overlay covers the calendar
          },
          content: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            zIndex: 1000, // Ensures modal is above the overlay
          },
        }}
      >
        <h2 className="text-xl font-bold">Confirm Reservation</h2>
        <p>
          <strong>Date:</strong> {selectedSlot && format(selectedSlot.start, "MMMM dd, yyyy")}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {selectedSlot &&
            `${format(selectedSlot.start, "HH:mm")} - ${format(selectedSlot.end, "HH:mm")}`}
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full p-2 border rounded"
        />
        <label className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
            className="mr-2"
          />
          I understand the terms and privacy policy
        </label>
        <button
          onClick={handleConfirmReservation}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
        >
          Confirm Reservation
        </button>
        <button
          onClick={handleModalClose}
          className="mt-2 w-full bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default AreaDetailsPage;
