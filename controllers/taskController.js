import {
    getAllTasks,
    createTask,
    toggleTaskCompleted,
    deleteTask,
    updateTask
  } from '../models/taskModel.js';
  
  // GET /
  export async function renderHomePage(req, res) {
    try {
      const tasks = await getAllTasks();
      res.render('index', { tasks, errors: null, formData: {} });
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { message: 'Failed to load tasks.' });
    }
  }
  
  // POST /tasks
  export async function handleCreateTask(req, res) {
    const { title, description } = req.body;
    const errors = [];
  
    // Input validation
    if (!title || title.length < 3 || title.length > 100) {
      errors.push('Title must be between 3 and 100 characters.');
    }
    if (description && description.length > 500) {
      errors.push('Description cannot exceed 500 characters.');
    }
  
    if (errors.length > 0) {
      const tasks = await getAllTasks();
      return res.status(400).render('index', {
        tasks,
        errors,
        formData: { title, description }
      });
    }
  
    try {
      await createTask(title, description);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { message: 'Failed to create task.' });
    }
  }
  
  // PATCH /tasks/:id
  export async function handleToggleComplete(req, res) {
    try {
      await toggleTaskCompleted(req.params.id);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { message: 'Failed to update task.' });
    }
  }
  
  // DELETE /tasks/:id
  export async function handleDeleteTask(req, res) {
    try {
      await deleteTask(req.params.id);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { message: 'Failed to delete task.' });
    }
  }
  
  // PUT /tasks/:id
  export async function handleUpdateTask(req, res) {
    const { title, description } = req.body;
    const errors = [];
  
    // Input validation
    if (!title || title.length < 3 || title.length > 100) {
      errors.push('Title must be between 3 and 100 characters.');
    }
    if (description && description.length > 500) {
      errors.push('Description cannot exceed 500 characters.');
    }
  
    if (errors.length > 0) {
      const tasks = await getAllTasks();
      return res.status(400).render('index', {
        tasks,
        errors,
        formData: { title, description },
      });
    }
  
    try {
      await updateTask(req.params.id, title, description);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { message: 'Failed to update task.' });
    }
  }
  