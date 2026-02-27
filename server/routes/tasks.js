const express = require("express");
const router = express.Router();
const { tasks: db } = require("../database");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await db.find({}).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET single task
router.get("/:id", async (req, res) => {
  try {
    const task = await db.findOne({ _id: req.params.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const { title, priority } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = {
      title: title.trim(),
      completed: false,
      priority: priority || "medium",
    };

    const task = await db.insert(newTask);
    res.status(201).json(task);
  } catch (err) {
    console.log("INSERT ERROR:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const { title, completed, priority } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (completed !== undefined) updates.completed = completed;
    if (priority !== undefined) updates.priority = priority;

    const updated = await db.update(
      { _id: req.params.id },
      { $set: updates },
      { returnUpdatedDocs: true }
    );

    // nedb-promises returns updated doc when returnUpdatedDocs is true
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update" });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const numRemoved = await db.remove({ _id: req.params.id }, {});
    if (numRemoved === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted", _id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;