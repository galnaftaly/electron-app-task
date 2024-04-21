import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const History = () => {
  const addedTasks = JSON.parse(localStorage.getItem('added_tasks')) || []
  const removedTasks = JSON.parse(localStorage.getItem('removed_tasks')) || []
  return (
    <div style={{ margin: 20 }}>
      <h1>History of Tasks</h1>
      <List>
        {addedTasks.map(task => (
          <ListItem key={task.id} divider>
            <ListItemText primary={task.name} secondary={task.complete ? 'Completed' : 'Pending'} />
          </ListItem>
        ))}
        {removedTasks.map(task => (
          <ListItem key={task.id} divider>
            <ListItemText primary={task.name} secondary={'Deleted'} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default History;