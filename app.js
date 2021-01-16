// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  // DOMContentLoaded right after DOM is loaded
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and appende to li
    li.appendChild(document.createTextNode(task));
    // Create new link createElement
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"> </li>';
    // append the link to li
    li.appendChild(link);
    // append li to ul;
    taskList.appendChild(li);

  });
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and appende to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link createElement
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"> </li>';
  // append the link to li
  li.appendChild(link);

  // append li to ul;
  taskList.appendChild(li);

  // store in LS
  storeTaskInLocalStorage(taskInput.value);

  // clear taskInput
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

// https://jsperf.com/innerhtml-vs-removechild

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    // if no match -1
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
