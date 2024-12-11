// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// Function to add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  // Add task to localStorage
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  // Add task to DOM
  displayTask(task);

  // Clear input
  input.value = "";
}

// Function to display a task in the DOM
function displayTask(task) {
  const list = document.getElementById("taskList");
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
        ${task.text}
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

  // Add click event to toggle completion
  li.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") {
      toggleTask(task.id);
    }
  });

  list.appendChild(li);
}

// Function to toggle task completion
function toggleTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);

    const li = document.querySelector(`li[data-id="${id}"]`);
    li.classList.toggle("completed");
  }
}

// Function to delete a task
function deleteTask(id) {
  const tasks = getTasks().filter((task) => task.id !== id);
  saveTasks(tasks);

  const li = document.querySelector(`li[data-id="${id}"]`);
  li.remove();
}

// Helper function to get tasks from localStorage
function getTasks() {
  const tasksJSON = localStorage.getItem("tasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Helper function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach((task) => displayTask(task));
}
