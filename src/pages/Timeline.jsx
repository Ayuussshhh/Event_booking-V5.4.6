import React, { useState, useMemo } from "react";
import "./Timeline.css"; // Add custom styles here

const events = [
  // Your events array
  // ... (same as before)
  {
    id: 61,
    title: "Robotics",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/finalimgone.jpg",
    link: "/Robote",
  },
  {
    id: 62,
    title: "SOFTWARE",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/professional-programmer-working-late-dark-office.jpg",
    link: "/Cs",
  },
  {
    id: 63,
    title: "management",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/7054169.jpg",
    link: "/Management",
  },
  {
    id: 64,
    title: "civil",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/background.jpg",
    link: "/Civil",
  },
  {
    id: 65,
    title: "pahal",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/56514.jpg",
    link: "/Pahal",
  },
  {
    id: 66,
    title: "sports",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/6qyc_ylv8_230329.jpg",
    link: "/Sports",
  },
  {
    id: 67,
    title: "mechanical",
    date: "Tue, Jan 2, 4:30 AM",

    button: "discover events",
    author: "lead",
    image: "/images/mech.jpg",
    link: "/Mech",
  },
  {
    id: 68,
    title: "pharmacy",
    date: "Fri, Dec 15, 8:30 AM",

    button: "discover events",
    author: "lead",
    image: "/images/20944962.jpg",
    link: "/Cdip",
  },

  {
    id: 69,
    title: "on spot events",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/ws.jpg",
    link: "/Onspotevents",
  },

  {
    id: 70,
    title: "law",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/view-3d-justice-scales.jpg",
    link: "/Law",
  },
  {
    id: 71,
    title: "FIRST YEAR",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/science.webp",
    link: "/Firstyear",
  },
  {
    id: 72,
    title: "ENTERTAINMENT",
    date: "date",

    button: "discover events",
    author: "lead",
    image: "/images/party_audience_on_spotlight_background_2107.jpg",
    link: "/Specialevents",
  },
];

// ✅ Optimize EventCard with React.memo to prevent unnecessary re-renders
const EventCard = React.memo(({ event }) => {
  return (
    <div className="event-card">
      <img
        src={event.image}
        alt={event.title}
        className="event-image"
        loading="lazy"
        decoding="async"
      />
      <div className="event-info">
        <p className="event-date">{event.date}</p>
        <h3 className="event-title">{event.title}</h3>

        <a href={event.link} className="event-button">
          {event.button}
        </a>
      </div>
    </div>
  );
});

// ✅ useMemo to avoid recalculating filtered events unless searchTerm changes
const Timeline = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ useMemo to filter events based on search term
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="app-container">
      <div className="searchh-bar">
        <span className="searchh-icon">
          <i className="fas fa-search search-icon"></i>
        </span>
        <input
          type="text"
          placeholder="Search title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="columns-container">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
