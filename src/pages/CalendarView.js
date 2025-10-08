import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Button,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styling
import BackButton from "../components/BackButton";
import SectionHeader from "../components/SectionHeader";

const CalendarView = ({ setView, events }) => {
  const [date, setDate] = useState(new Date("2025-10-08"));
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedEvents = events.filter(
      (e) => new Date(e.date).toDateString() === newDate.toDateString()
    );
    setFilteredEvents(selectedEvents);
  };

  const showAllUpcoming = () => {
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    const upcoming = events.filter(
      (e) =>
        new Date(e.date) <= twoWeeksFromNow && new Date(e.date) >= new Date()
    );
    setFilteredEvents(upcoming);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (e) => new Date(e.date).toDateString() === date.toDateString()
      );
      return event ? (
        <Box
          sx={{
            width: 6,
            height: 6,
            bgcolor: "primary.main",
            borderRadius: "50%",
            margin: "auto",
          }}
        />
      ) : null;
    }
  };

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Calendar
      </Typography>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
      />
      <SectionHeader>
        Upcoming Orders
        <Button size="small" onClick={showAllUpcoming} sx={{ ml: 2 }}>
          Revert
        </Button>
      </SectionHeader>
      <List>
        {filteredEvents.map((event, index) => (
          <React.Fragment key={event.date}>
            <ListItemButton onClick={() => setView("editOrderScreen")}>
              <ListItemText
                primary={`${new Date(event.date).toDateString()}: ${
                  event.customer
                }`}
                secondary={`${event.time} - $${event.total}`}
              />
            </ListItemButton>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default CalendarView;
