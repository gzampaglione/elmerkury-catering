import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
            bgcolor:
              event.channel === "Satellite" ? "warning.main" : "primary.main",
            borderRadius: "50%",
            margin: "auto",
          }}
        />
      ) : null;
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case "Email":
        return "primary";
      case "Website":
        return "success";
      case "Satellite":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Typography variant="h6" sx={{ mb: 2 }}>
        📅 Calendar
      </Typography>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
      />
      <SectionHeader>
        Upcoming Orders
        <Button size="small" onClick={showAllUpcoming} sx={{ ml: 2 }}>
          Show All
        </Button>
      </SectionHeader>
      <List>
        {filteredEvents.map((event, index) => (
          <React.Fragment key={event.date + index}>
            <ListItemButton onClick={() => setView("editOrderScreen")}>
              <ListItemText
                primary={`${new Date(event.date).toDateString()}: ${
                  event.customer
                }`}
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      label={event.channel}
                      size="small"
                      color={getChannelColor(event.channel)}
                    />
                    <Typography variant="caption">
                      {event.time} - ${event.total}
                    </Typography>
                  </Box>
                }
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
