import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import BackButton from "../components/BackButton";
import SectionHeader from "../components/SectionHeader";

const CalendarView = ({ setView, events }) => {
  const [viewMode, setViewMode] = useState("month");
  const today = new Date("2025-10-08");
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const days = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);
  const firstDayIndex = startOfMonth.getDay();

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">October 2025</Typography>
        <Tabs value={viewMode} onChange={(e, val) => setViewMode(val)}>
          <Tab label="Month" value="month" />
          <Tab label="Week" value="week" />
        </Tabs>
      </Box>
      <Grid
        container
        columns={7}
        sx={{
          mt: 2,
          borderTop: "1px solid #ccc",
          borderLeft: "1px solid #ccc",
        }}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <Grid
            item
            xs={1}
            key={day}
            textAlign="center"
            sx={{ bgcolor: "grey.200", borderRight: "1px solid #ccc" }}
          >
            <Typography variant="caption" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <Grid
            item
            xs={1}
            key={`empty-${i}`}
            sx={{
              borderRight: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              bgcolor: "grey.100",
            }}
          />
        ))}
        {days.map((day) => {
          const event = events.find(
            (e) => new Date(e.date).getDate() + 1 === day
          );
          return (
            <Grid item xs={1} key={day}>
              <Paper
                square
                elevation={0}
                sx={{
                  height: 40,
                  p: 0.5,
                  borderRight: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  bgcolor: event ? "primary.light" : "transparent",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={day === 8 ? "bold" : "normal"}
                >
                  {day}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <SectionHeader>Upcoming Orders</SectionHeader>
      <List>
        {events.map((event) => (
          <ListItem key={event.date}>
            <ListItemText
              primary={`${new Date(event.date).toDateString()}: ${
                event.customer
              }`}
              secondary={`${event.time} - $${event.total}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CalendarView;
