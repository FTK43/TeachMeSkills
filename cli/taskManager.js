const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const dataFile = path.join(__dirname, "data.json");

function loadTasks() {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

function addTask(title) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(chalk.green(`Задача добавлена: "${title}"`));
}

// --completed
// --pending
function listTasks(filter) {
  const tasks = loadTasks();
  let filteredTasks = tasks;

  if (filter === "--completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  }
  if (filter === "--pending") {
    filteredTasks = tasks.filter((t) => !t.completed);
  }

  if (filteredTasks.length === 0) {
    console.log(chalk.yellow("Нет задач в списке"));
    return;
  }

  filteredTasks.forEach((task) => {
    const status = task.completed
      ? chalk.green("[ВЫПОЛНЕНО]")
      : chalk.red("[В ПРОЦЕССЕ]");
    const title = task.completed ? chalk.strikethrough(task.title) : task.title;

    console.log(`${status} ${task.id} ${title}`);
  });
}

function markTaskAsDone(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    console.log(chalk.red("Задача не найдена"));
    return;
  }
  task.completed = true;
  saveTasks(tasks);

  console.log(chalk.blue(`Задача "${task.title}" отмечена как выполненная`));
}

function deleteTask(id) {
  let tasks = loadTasks();
  const initialLength = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === initialLength) {
    console.log(chalk.red("Задача не найдена"));
    return;
  }
  saveTasks(tasks);

  console.log(chalk.yellow(`Задача с ID ${id} удалена`));
}

function clearTasks() {
  saveTasks([]);

  console.log(chalk.magenta("Все задачи удалены"));
}

function editTask(editedTask) {
  let tasks = loadTasks();
  const task = tasks.find((t) => t.id === editedTask.id);
  if (!task) {
    console.log(chalk.red("Задача не найдена"));
    return;
  }
  task.title = editedTask.title;
  saveTasks(tasks);

  console.log(chalk.green(`Задача с ID ${editedTask.id} изменена`));
}

module.exports = {
  addTask,
  listTasks,
  markTaskAsDone,
  deleteTask,
  clearTasks,
  editTask,
};
