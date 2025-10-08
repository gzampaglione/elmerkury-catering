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
  RadioGroup,
  Radio,
} from "@mui/material";
import { ExpandMore, CheckCircle } from "@mui/icons-material";
import BackButton from "../components/BackButton";

const SettingsPage = ({ setView, setAppState }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back</BackButton>
    <Typography variant="h6">⚙️ Settings</Typography>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Integrations
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Toast:{" "}
          <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
          Connected
        </Typography>
        <Box>
          <Button size="small">Reconnect</Button>
          <Button size="small" onClick={() => setAppState("error_connection")}>
            Test
          </Button>
          <Button size="small">Sync Menu Now</Button>
        </Box>
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
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Budget buffer %"
          defaultValue="10"
          sx={{ mb: 2 }}
        />
        <Typography variant="caption" color="text.secondary">
          Ingredient Preference:
        </Typography>
        <RadioGroup row defaultValue="high">
          <FormControlLabel
            value="high"
            control={<Radio size="small" />}
            label="High"
          />
          <FormControlLabel
            value="medium"
            control={<Radio size="small" />}
            label="Medium"
          />
          <FormControlLabel
            value="low"
            control={<Radio size="small" />}
            label="Low"
          />
        </RadioGroup>
        <FormControlLabel
          control={<Switch />}
          label="Include experimental items"
        />
      </AccordionDetails>
    </Accordion>
    <Accordion>
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
        <TextField
          fullWidth
          size="small"
          label="Notification Email"
          defaultValue="sofia@elmerkury.com"
          sx={{ mt: 1 }}
        />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>Inventory</AccordionSummary>
      <AccordionDetails>
        <Button>Open Inventory Sheet →</Button>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Low inventory alerts"
        />
        <TextField size="small" label="Alert threshold %" defaultValue="20" />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Advanced (Simulate States)
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => setAppState("error_connection")}
          >
            Simulate Connection Error
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => setAppState("error_validation")}
          >
            Simulate Validation Error
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="info"
            onClick={() => setAppState("loading_proposals")}
          >
            Simulate Loading State
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
    <Button variant="contained" sx={{ mt: 2 }}>
      💾 Save Settings
    </Button>
  </>
);

export default SettingsPage;
