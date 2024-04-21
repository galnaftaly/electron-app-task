import React from "react";
import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Tasks from "./Tasks";
import History from "./History";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/tasks">
              Tasks
            </Button>
            <Button color="inherit" component={Link} to="/history">
              History
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
