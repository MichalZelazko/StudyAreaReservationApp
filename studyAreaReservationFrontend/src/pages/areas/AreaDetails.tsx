import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configure the date-fns localizer
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

const AreaDetailsPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Reserved Slot",
      start: new Date(2024, 11, 15, 10, 0), // Example event: Dec 15, 2023, 10:00 AM
      end: new Date(2024, 11, 15, 12, 0),   // Ends at Dec 15, 2023, 12:00 PM
    },
  ]);

  //handle selecting a time slot
  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    const title = window.prompt("Enter a title for the event:");
    if (title) {
      setEvents((prevEvents) => [...prevEvents, { title, start, end }]);
    }
  };

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
            selectable // Enables drag-to-select functionality
            onSelectSlot={handleSelectSlot} // Handles selection of slots
            defaultView="week" // Sets the default view to "week"
            style={{ height: 500, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaDetailsPage;
