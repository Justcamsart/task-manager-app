import Task from '../models/Task.js';
import { createTaskSchema, updateTaskSchema } from '../validations/taskValidation.js';

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single task
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create task
export const createTask = async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task (status and progress)
export const updateTask = async (req, res) => {
  try {
    const { status, progress } = req.body;

    if (!status) return res.status(400).json({ error: 'Statut requis' });

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status, ...(progress !== undefined && { progress }) },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: 'Tâche non trouvée' });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get stats
export const getTaskStats = async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;
    const aFaire = tasks.filter(t => t.status === 'À faire').length;
    const enCours = tasks.filter(t => t.status === 'En cours').length;
    const completees = tasks.filter(t => t.status === 'Complété').length;

    const progressionMoyenne =
      total > 0
        ? Math.round(tasks.reduce((acc, t) => acc + (t.progress || 0), 0) / total)
        : 0;

    res.json({
      total,
      aFaire,
      enCours,
      completees,
      progressionMoyenne
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
