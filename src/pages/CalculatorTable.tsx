import React, { useEffect, useState } from "react";
import { usePrevious } from "react-use";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CalculatorTable() {
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  const [rows, setRows] = useState([
    { operator: "", value: "", isDisabled: false },
  ]);

  useEffect(() => {
    let calVal = 0;
    if (prevLength && prevLength >= rows.length) {
      rows.forEach((row) => {
        if (row.value && row.operator && !row.isDisabled) {
          if (row.operator === "+") calVal = calVal + parseInt(row.value);
          else if (row.operator === "-") calVal = calVal - parseInt(row.value);
        }
      });
      setCalculatedValue(calVal);
    }
  }, [rows]);

  /** This function handle adding row in the table. */
  const handleAddRow = () => {
    const item = {
      operator: "",
      value: "",
      isDisabled: false,
    };
    setRows([...rows, item]);
  };

  /** This function handle the input box for number. */
  const changeHandler = (e: any, idx: number) => {
    const rowsExtracted = [...rows];
    rowsExtracted[idx].value = e.target.value;
    setRows(rowsExtracted);
  };

  /** This function handle the select dropdown for operator. */
  const changeHandlerSelect = (e: any, idx: number) => {
    const rowsExtracted = [...rows];
    rowsExtracted[idx].operator = e.target.value;
    setRows(rowsExtracted);
  };
  const prevLength = usePrevious(rows.length);

  /** This function handle the delete the rows in the table. */
  const handleRemoveSpecificRow = (idx: number) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  /** This function handle the disabling the rows in the table. */
  const handleDisableSpecificRow = (idx: number, isDisable: boolean) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows[idx].isDisabled = isDisable;
    setRows(tempRows);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleAddRow}
        sx={{
          margin: 2,
        }}
      >
        Add Row
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800, padding: 2 }} aria-label="caption table">
          <caption>Result: {calculatedValue}</caption>
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Operations</StyledTableCell>
              <StyledTableCell align="right">Number</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell align="right">Disable</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, idx) => (
              <StyledTableRow key={idx}>
                <TableCell>
                  <InputLabel id="demo-simple-select-label">
                    Operation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.operator}
                    label="Age"
                    onChange={(e) => changeHandlerSelect(e, idx)}
                    disabled={item.isDisabled}
                  >
                    <MenuItem value="+">+</MenuItem>
                    <MenuItem value="-">-</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={item.value}
                    onChange={(e) => changeHandler(e, idx)}
                    disabled={item.isDisabled}
                  />
                </TableCell>

                <TableCell align="right">
                  <button
                    name="delete"
                    onClick={() => handleRemoveSpecificRow(idx)}
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell align="right">
                  <button
                    name="disable"
                    onClick={() =>
                      handleDisableSpecificRow(idx, !item.isDisabled)
                    }
                  >
                    {item.isDisabled ? "Enable" : "Disable"}
                  </button>{" "}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
