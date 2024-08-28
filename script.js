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

const formAddTask = document.querySelector('.form-add-task');
const formInput = document.querySelector('.form-add-task input');
const btnAddTask = document.querySelector('.add-btn');
const checklistItem = document.querySelector('.checklist-item');
const inputCheck = document.querySelector('.checklist-item input');
const btnDeleteTask = document.querySelector('.delete-btn');
const taskList = document.querySelector('.task-list');
const taskListFinished = document.querySelector('.task-list-finished');

formAddTask.addEventListener('submit', addNewTask);

let tasks = initialTasks;

function addNewTask(e) {
  e.preventDefault();

  if (formInput.value === '') {
    clearForm();
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    description: formInput.value,
    finished: false,
  };

  tasks = [...tasks, newTask];

  renderUI();
  clearForm();
}

function clearForm() {
  formInput.value = '';
}

function renderTaskList() {
  taskList.innerHTML =
    tasks.filter((task) => task.finished === false).length > 0
      ? markupTasks(tasks)
      : '<div class="message"><span>🙃</span> Start adding some tasks</div>';
}

function renderFinishedTaskList() {
  taskListFinished.innerHTML = markupTasksFinished(tasks);
}

function addCheckboxListeners() {
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) =>
      checkbox.addEventListener('change', setTaskAsFinished)
    );
}

function addDeleteButtonListeners() {
  document
    .querySelectorAll('.delete-btn')
    .forEach((btn) => btn.addEventListener('click', deleteTask));
}

function setTaskAsFinished(e) {
  const targetEl = e.target.closest('.task');

  tasks = tasks.map((task) =>
    task.id === targetEl.getAttribute('data-id')
      ? { ...task, finished: e.target.checked }
      : task
  );
  renderUI();
}

function renderUI() {
  renderTaskList();
  renderFinishedTaskList();
  addCheckboxListeners();
  addDeleteButtonListeners();
}

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

function deleteTask(e) {
  const targetEl = e.target.closest('.task');
  tasks = tasks.filter((task) => task.id !== targetEl.getAttribute('data-id'));
  renderUI();
}

renderUI();
