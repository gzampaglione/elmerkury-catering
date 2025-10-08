import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Step2_Profitability = ({ item }) => {
  const lineTotal = item.qty * item.unitPrice;
  const estLaborCost = item.qty * item.estLaborHours * 25;
  const estFoodCost = item.qty * item.estFoodCost;
  const grossMargin = lineTotal - estFoodCost - estLaborCost;

  return (
    <Accordion sx={{ mt: 1, boxShadow: "none", bgcolor: "grey.50" }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="caption">Profitability</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Est Food Cost:</TableCell>
              <TableCell align="right">
                ${estFoodCost.toFixed(2)} ({item.ingredients.join(", ")})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Est Labor Cost:</TableCell>
              <TableCell align="right">
                ${estLaborCost.toFixed(2)} ({item.estLaborHours} hrs)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Tooltip title="Line Total - Food & Labor">
                  <Typography variant="caption" fontWeight="bold">
                    Gross Margin:
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  color="success.main"
                >
                  ${grossMargin.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

export default Step2_Profitability;
