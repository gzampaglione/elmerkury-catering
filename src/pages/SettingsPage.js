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
  Divider,
} from "@mui/material";
import { ExpandMore, CheckCircle } from "@mui/icons-material";
import BackButton from "../components/BackButton";

const SettingsPage = ({ setView, setAppState }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back</BackButton>
    <Typography variant="h6" sx={{ mb: 2 }}>
      ⚙️ Settings
    </Typography>

    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Integrations
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            Toast:{" "}
            <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
            Connected
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Last sync: 2 hours ago
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button size="small">Reconnect</Button>
            <Button
              size="small"
              onClick={() => setAppState("error_connection")}
            >
              Test
            </Button>
            <Button size="small">Sync Menu Now</Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            QuickBooks:{" "}
            <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
            Connected
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button size="small">Reconnect</Button>
            <Button size="small">Test</Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            HubSpot:{" "}
            <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
            Connected
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button size="small">Reconnect</Button>
            <Button size="small">Test</Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2">
            MarginEdge:{" "}
            <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
            Connected
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Real-time costing & inventory
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button size="small">Reconnect</Button>
            <Button size="small">Test</Button>
            <Button size="small">Sync Costs Now</Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Menu Generation (AI)
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          size="small"
          label="Number of proposals"
          defaultValue="5"
          sx={{ mb: 2 }}
          helperText="3-10 proposals per generation"
        />
        <TextField
          fullWidth
          size="small"
          label="Budget buffer %"
          defaultValue="10"
          sx={{ mb: 2 }}
          helperText="Stay X% under customer budget"
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
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          How much to favor items with ingredients on hand
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Use MarginEdge costs in proposals"
        />
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
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="PO received"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Payment overdue"
        />
        <FormControlLabel control={<Switch />} label="Low inventory alerts" />
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
      <AccordionSummary expandIcon={<ExpandMore />}>
        Inventory (MarginEdge)
      </AccordionSummary>
      <AccordionDetails>
        <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
          Open MarginEdge Dashboard →
        </Button>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Low inventory alerts"
        />
        <TextField
          size="small"
          label="Alert threshold %"
          defaultValue="20"
          helperText="Alert when stock falls below this %"
        />
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        PO Monitoring
      </AccordionSummary>
      <AccordionDetails>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Auto-detect PO emails (hourly)"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Alert when PO received"
        />
        <TextField
          fullWidth
          size="small"
          label="Overdue PO threshold (days)"
          defaultValue="3"
          sx={{ mt: 1 }}
          helperText="Alert after X days without PO"
        />
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

    <Button variant="contained" fullWidth sx={{ mt: 2 }}>
      💾 Save Settings
    </Button>
  </>
);

export default SettingsPage;
