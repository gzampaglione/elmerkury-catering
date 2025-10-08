import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const GenerateProposalStep1 = ({ setView, customer }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
    <Typography variant="h6">Generate Menu Proposal</Typography>
    <Typography color="text.secondary">Customer: {customer.name}</Typography>
    <SectionHeader>Requirements</SectionHeader>
    <TextField
      fullWidth
      label="Budget"
      defaultValue="500.00"
      margin="dense"
      size="small"
      helperText="Recognized by AI from email"
    />
    <TextField
      fullWidth
      label="Number of People"
      defaultValue="30"
      margin="dense"
      size="small"
      helperText="Recognized by AI from email"
    />
    <Typography variant="caption">Per Person Budget: $16.67</Typography>
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => setView("generateProposalStep2")}
    >
      ✨ Generate 3 Proposals
    </Button>
  </>
);

export default GenerateProposalStep1;
