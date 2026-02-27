import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Stack,
  List, ListItem, ListItemText, ListItemIcon,
  IconButton, Checkbox, Paper, CircularProgress,
  Alert, Snackbar, Chip, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  getTasks, createTask, updateTask, deleteTask
} from "../services/api";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false, message: "", severity: "success"
  });

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const task = await createTask(newTitle);
      setTasks([...tasks, task]);
      setNewTitle("");
      setSnackbar({ open: true, message: "Task added!", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task._id, {
        completed: !task.completed,
      });
      setTasks(tasks.map(t => (t._id === task._id ? updated : t)));
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      setSnackbar({ open: true, message: "Task deleted", severity: "info" });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const completed = tasks.filter(t => t.completed).length;

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label={`${tasks.length} total`} />
        <Chip label={`${completed} done`} color="success" />
        <Chip label={`${tasks.length - completed} remaining`} color="warning" />
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box component="form" onSubmit={handleAdd}>
          <Stack direction="row" spacing={2}>
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              label="New Task"
              fullWidth
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Add Task
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Paper>
        <List>
          {tasks.map((task, index) => (
            <Box key={task._id}>
              {index > 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.disabled" : "text.primary",
                  }}
                />
              </ListItem>
            </Box>
          ))}

          {tasks.length === 0 && (
            <ListItem>
              <ListItemText
                primary="No tasks yet. Add one above!"
                sx={{ textAlign: "center", color: "text.secondary" }}
              />
            </ListItem>
          )}
        </List>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TasksPage;