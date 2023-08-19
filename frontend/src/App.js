import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Typography,
  TextField,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import "./App.css";

function App() {
  const [digits, setDigits] = useState("0");
  const [singleToken, setSingleToken] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [totalCount, setTotalCount] = useState(-1); //React strict mode renders component twice
  const [validCount, setValidCount] = useState(0);
  const [validTokens, setValidTokens] = useState([]);

  const [intervalId, setIntervalId] = useState();
  const initialRender = useRef(true);

  const handleGenerateValidateToken = async () => {
    // Generate token
    const tokenDigits = Array.from(
      { length: 16 },
      () => digits[Math.floor(Math.random() * digits.length)]
    );
    const token = tokenDigits
      .join("")
      .replace(/(.{4})/g, "$1-")
      .slice(0, -1);

    // Send validation request
    try {
      const response = await fetch("http://localhost:5000/validateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      setIsValid(data.isValid);
      setSingleToken(token);
    } catch (error) {
      console.error("Error generating single token:", error);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    setTotalCount(totalCount + 1);
    if (isValid) {
      setValidTokens((validTokens) => [...validTokens, singleToken]);
      setValidCount(validCount + 1);
    }
  }, [singleToken]);

  useEffect(() => {
    if (isGenerating) {
      setIntervalId(
        setInterval(() => {
          handleGenerateValidateToken();
        }, 1000)
      );
    } else {
      clearInterval(intervalId);
    }
  }, [isGenerating]);

  const handleStartToken = () => {
    setIsGenerating(!isGenerating);
  };

  return (
    <div className="App">
      <div className="container">
        <Typography style={{ fontSize: "30px" }}>
          Token Generator & Validator
        </Typography>
        <div>
          <label>
            Please choose the digits for token generation
            <TextField
              fullWidth
              type="number"
              value={digits}
              onChange={(e) => setDigits(e.target.value)}
            />
          </label>
        </div>
        <div>
          <ButtonGroup className="buttonGroup">
            <Button
              variant="contained"
              disabled={isGenerating}
              onClick={handleGenerateValidateToken}
            >
              Generate single Token
            </Button>
            <Button variant="contained" onClick={handleStartToken}>
              {isGenerating
                ? "Stop token generation"
                : "Start token generation"}
            </Button>
          </ButtonGroup>
          <div className="tokenTexts">
            <Typography>Token: {singleToken}</Typography>
            <Typography>
              Validity of token: {isValid ? "Valid" : "Invalid"}
            </Typography>
            <Typography>Total count: {totalCount}</Typography>
            <Typography>Valid count: {validCount}</Typography>
            {validTokens.length > 0 && (
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Valid tokens</TableCell>
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
        </div>
      </div>
    </div>
  );
}

export default App;
