import pool from '../db/pool.js';

// Get all tasks
export async function getAllTasks() {
  const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
  return result.rows;
}

// Create a new task
export async function createTask(title, description) {
  const result = await pool.query(
    'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  );
  return result.rows[0];
}

// Toggle completion status
export async function toggleTaskCompleted(id) {
  const result = await pool.query(
    'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

// Delete a task
export async function deleteTask(id) {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}

// Update task title & description
export async function updateTask(id, title, description) {
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, id]
  );
  return result.rows[0];
}
