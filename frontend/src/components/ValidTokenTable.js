import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

function ValidTokenTable({ validTokens }) {
  return (
    <div className="table">
      {validTokens.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Valid tokens
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validTokens.map((token, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {token}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ValidTokenTable;
