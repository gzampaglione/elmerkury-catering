import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Step2_OrderProfitability = ({
  finalSubtotal,
  totalFoodCost,
  totalLaborCost,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Order Profitability Details
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <Typography>Revenue:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>${finalSubtotal.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Est Food Cost:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>- ${totalFoodCost.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Est Labor Cost:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>- ${totalLaborCost.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Gross Profit:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography fontWeight="bold">
              ${(finalSubtotal - totalFoodCost - totalLaborCost).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Step2_OrderProfitability;
