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
  Box,
  Chip,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Step2_Profitability = ({ item }) => {
  const lineTotal = item.qty * item.unitPrice;

  if (!item.marginEdge) {
    return null;
  }

  const totalFoodCost = item.marginEdge.foodCost * item.qty;
  const totalLaborCost = item.marginEdge.laborCost * item.qty;
  const grossMargin = lineTotal - totalFoodCost - totalLaborCost;
  const grossMarginPercent = (grossMargin / lineTotal) * 100;

  return (
    <Accordion sx={{ mt: 1, boxShadow: "none", bgcolor: "grey.50" }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            pr: 2,
          }}
        >
          <Typography variant="caption">Detailed Profitability</Typography>
          <Chip
            label={`${grossMarginPercent.toFixed(1)}% margin`}
            size="small"
            color={
              grossMarginPercent > 60
                ? "success"
                : grossMarginPercent > 40
                ? "warning"
                : "error"
            }
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Revenue:</TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">
                  ${lineTotal.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="caption" fontWeight="bold">
                  Costs (MarginEdge):
                </Typography>
              </TableCell>
            </TableRow>
            {item.marginEdge.ingredients?.map((ing, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ pl: 3 }}>
                  <Typography variant="caption">
                    • {ing.name} ({ing.qty}){!ing.inStock && " ⚠️"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption">
                    ${(ing.cost * item.qty).toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="caption" fontWeight="bold">
                  Total Food Cost:
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption" fontWeight="bold">
                  ${totalFoodCost.toFixed(2)} (
                  {item.marginEdge.foodCostPercent.toFixed(1)}%)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Labor Cost:</TableCell>
              <TableCell align="right">
                ${totalLaborCost.toFixed(2)} (
                {item.marginEdge.laborHours * item.qty} hrs)
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: "success.50" }}>
              <TableCell>
                <Tooltip title="Revenue - Food Cost - Labor Cost">
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
                  ${grossMargin.toFixed(2)} ({grossMarginPercent.toFixed(1)}%)
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
