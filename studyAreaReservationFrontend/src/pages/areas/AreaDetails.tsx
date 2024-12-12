import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createClient } from '@supabase/supabase-js';
import { useParams } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Let's first verify the credentials are loaded
console.log('Supabase URL exists:', !!supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

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
  UserUUID: string;
}

const AreaDetailsPage = () => {  // Added default value for testing
  const { id, areaId } = useParams<{ id: string; areaId: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log('Fetching reservations for area:', areaId);
        
        const { data, error } = await supabase
          .from('Reservations')
          .select('*')
          .eq('AreaId', areaId);

        if (error) {
          console.error('Supabase error details:', error);
          throw error;
        }

        console.log('Fetched data:', data);

        const transformedEvents = data.map((reservation: Reservation) => ({
          title: reservation.ReservationTitle,
          start: new Date(reservation.ReservationStart),
          end: new Date(reservation.ReservationEnd),
        }));

        console.log('Transformed events:', transformedEvents);
        setEvents(transformedEvents);
      } catch (err) {
        console.error('Full error object:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [areaId]);

  // Rest of your code remains the same...

  const handleSelectSlot = async ({ start, end }: SlotInfo) => {
    const title = window.prompt("Enter a title for the reservation:");
    if (!title) return;

    try {
      // Add reservation to Supabase
      const { error } = await supabase
        .from('Reservations')
        .insert([{
          AreaId: areaId,
          ReservationTitle: title,
          ReservationStart: start.toISOString(),
          ReservationEnd: end.toISOString(),
          IsConfirmed: false,
          // UserUUID: 'current-user-uuid' // Replace with actual user UUID from your auth system
        }]);

      if (error) throw error;

      // Add the new event to the calendar
      setEvents(prevEvents => [...prevEvents, { title, start, end }]);
    } catch (err) {
      console.error('Error adding reservation:', err);
      alert('Failed to add reservation. Please try again.');
    }
};

  // Optional: Handle event deletion
  const handleEventClick = async (event: Event) => {
    const confirmDelete = window.confirm('Do you want to delete this reservation?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('Reservations')
        .delete()
        .match({ 
          AreaId: areaId,
          ReservationTitle: event.title,
          ReservationStart: event.start.toISOString(),
          ReservationEnd: event.end.toISOString()
        });

      if (error) throw error;

      setEvents(prevEvents => 
        prevEvents.filter(e => 
          !(e.title === event.title && 
            e.start.getTime() === event.start.getTime() && 
            e.end.getTime() === event.end.getTime())
        )
      );
    } catch (err) {
      console.error('Error deleting reservation:', err);
      alert('Failed to delete reservation. Please try again.');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col flex-grow p-6">
      <h2 className="text-2xl font-bold">Area Availability</h2>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold my-2">Availability Calendar</h3>
        <div className="flex flex-grow items-center justify-center rounded-lg border p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick}
            defaultView="week"
            style={{ height: 500, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaDetailsPage;