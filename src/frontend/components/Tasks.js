import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Tasks = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("added_tasks")) || []
  );
  const taskInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("added_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const name = taskInputRef.current.value;
    if (name === "") return;
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), name, complete: false },
    ]);
    taskInputRef.current.value = null;
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, complete: !task.complete } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    const updatedRemovedTasks =
      JSON.parse(localStorage.getItem("removed_tasks")) || [];
    updatedRemovedTasks.push(taskToDelete);
    localStorage.setItem("removed_tasks", JSON.stringify(updatedRemovedTasks));
    setTasks(updatedTasks);
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>Tasks</h1>
      <form onSubmit={addTask} style={{ display: "flex", marginBottom: 20 }}>
        <TextField
          label="Add a new task"
          variant="outlined"
          fullWidth
          inputRef={taskInputRef}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginLeft: 10 }}
        >
          Add Task
        </Button>
      </form>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} onClick={() => toggleComplete(task.id)}>
            <Checkbox edge="start" checked={task.complete} />
            <ListItemText primary={task.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
              >
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Tasks;
