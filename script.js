// Initial Test Data
const initialTasks = [
  {
    id: '1',
    description: 'Complete the project proposal',
    finished: false,
  },
  {
    id: '2',
    description: 'Search for simple coding projects',
    finished: false,
  },
  {
    id: '3',
    description: 'Start ToDo list project',
    finished: true,
  },
  {
    id: '4',
    description: 'Test new app',
    finished: true,
  },
  {
    id: '5',
    description: 'Fix app bugs',
    finished: false,
  },
];

// APPLICATION ARCHITECTURE

// Select necessary elements in the DOM
const formAddTask = document.querySelector('.form-add-task');
const formInput = document.querySelector('.form-add-task input');
const btnAddTask = document.querySelector('.add-btn');
const checklistItem = document.querySelector('.checklist-item');
const inputCheck = document.querySelector('.checklist-item input');
const btnDeleteTask = document.querySelector('.delete-btn');
const taskList = document.querySelector('.task-list');
const taskListFinished = document.querySelector('.task-list-finished');

// Form Add Task Event Listener
formAddTask.addEventListener('submit', addNewTask);

// Create and initiate task array
let tasks = initialTasks;

// Adding a new task
function addNewTask(e) {
  e.preventDefault();

  // Input should not be empty
  if (formInput.value === '') {
    clearForm();
    return;
  }

  // Create new task object
  const newTask = {
    id: crypto.randomUUID(),
    description: formInput.value,
    finished: false,
  };

  // Update tasks
  tasks = [...tasks, newTask];

  // Re-render everything and clear form
  renderUI();
  clearForm();
}

// Clear form function
function clearForm() {
  formInput.value = '';
}

// Re-renders the list of unfinished tasks
function renderTaskList() {
  taskList.innerHTML =
    tasks.filter((task) => task.finished === false).length > 0
      ? markupTasks(tasks)
      : '<div class="message"><span>🙃</span> Start adding some tasks</div>';
}

// Re-renders the list of finished tasks
function renderFinishedTaskList() {
  taskListFinished.innerHTML = markupTasksFinished(tasks);
}

// Create event listeners that will be re-created everytime the task list re-renders
// Generates a checkbox event listener for every task in the list
function addCheckboxListeners() {
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) =>
      checkbox.addEventListener('change', setTaskAsFinished)
    );
}

// Generates a click event listener for the delete button in every task in the list
function addDeleteButtonListeners() {
  document
    .querySelectorAll('.delete-btn')
    .forEach((btn) => btn.addEventListener('click', deleteTask));
}

// Mark a task as finished
function setTaskAsFinished(e) {
  // We find the closest parent with 'task' class because it contains the task id
  const targetEl = e.target.closest('.task');

  tasks = tasks.map((task) =>
    task.id === targetEl.getAttribute('data-id')
      ? { ...task, finished: e.target.checked }
      : task
  );
  renderUI();
}

// Completely delete a task from the list
function deleteTask(e) {
  // We find the closest parent with 'task' class because it contains the task id
  const targetEl = e.target.closest('.task');

  tasks = tasks.filter((task) => task.id !== targetEl.getAttribute('data-id'));
  renderUI();
}

// Re-render all tasks in the UI
function renderUI() {
  renderTaskList();
  renderFinishedTaskList();
  // Add listeners for the re-rendered elements
  addCheckboxListeners();
  addDeleteButtonListeners();
}

// Markup for unfinished tasks
function markupTasks(taskArray) {
  return taskArray
    .filter((task) => task.finished === false)
    .map(
      (task) => `
    <div class='task task-item' data-id=${task.id}>
      <label class='checklist-item'>
        <input type='checkbox'/>
        ${task.description}
      </label>
      <span class='delete-btn'>❌</span>
    </div>`
    )
    .join('');
}

// Markup for finished tasks
function markupTasksFinished(taskArray) {
  return taskArray
    .filter((task) => task.finished === true)
    .map(
      (task) => `
    <div class='task task-item-finished' data-id=${task.id}>
      <label class="checklist-item-finished">
        <input type="checkbox" checked />
        ${task.description}
      </label>
      <span class="delete-btn">❌</span>
    </div>`
    )
    .join('');
}

// Start the app by rendering the current tasks in the UI (initial tasks or empty array)
renderUI();
