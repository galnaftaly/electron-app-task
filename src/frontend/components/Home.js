import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";

const Home = () => {
  const firstNumberRef = useRef(null)
  const secondNumberRef = useRef(null)
  const [response, setResponse] = useState("");

  useEffect(() => {
    window.electron.ipcRenderer.receiveMessage(
      "CALCULATE_SUM_RETURN",
      (message) => {
        setResponse(message);
      }
    );
  }, []);

  const handleClick = () => {
    window.electron.api.calculateSum(firstNumberRef.current.value, secondNumberRef.current.value);
  };

  return (
    <Box sx={{ margin: 4 }}>
      <Typography sx={{marginY: 5}} variant="h5">React and Electron IPC Example</Typography>

      <div >
        <TextField
          inputRef={firstNumberRef}
          label="Number 1"
          variant="outlined"
          type="number"
          sx={{ marginRight: 2 }}
        />
        <TextField
          inputRef={secondNumberRef}
          label="Number 2"
          variant="outlined"
          type="number"
        />
      </div>
      <Button variant="contained" onClick={handleClick} sx={{ marginTop: 2 }}>
        Calculate
      </Button>
      <Typography sx={{marginY: 5}} variant="h6">Sum: {response}</Typography>
    </Box>
  );
};

export default Home;
