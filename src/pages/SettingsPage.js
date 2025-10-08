import React from "react";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { ExpandMore, CheckCircle } from "@mui/icons-material";
import BackButton from "../components/BackButton";

const SettingsPage = ({ setView }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back</BackButton>
    <Typography variant="h6">⚙️ Settings</Typography>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Integrations
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Toast:{" "}
          <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
          Connected
        </Typography>
        <Button size="small">Reconnect</Button>
        <Button size="small">Test</Button>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Menu Generation
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          size="small"
          label="Number of proposals"
          defaultValue="5"
        />
        <FormControlLabel
          control={<Switch />}
          label="Include experimental items"
        />
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Notifications
      </AccordionSummary>
      <AccordionDetails>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="New website orders"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Customer replies"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Payments received"
        />
        <FormControlLabel control={<Switch />} label="Daily summary" />
      </AccordionDetails>
    </Accordion>
    <Button variant="contained" sx={{ mt: 2 }}>
      💾 Save Settings
    </Button>
  </>
);

export default SettingsPage;
