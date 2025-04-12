const {
  addTask,
  listTasks,
  markTaskAsDone,
  deleteTask,
  clearTasks,
  editTask,
} = require("./taskManager");

const [, , command, ...args] = process.argv;
// 0 - node
// 1 - app.js
// 2 - add
// 3 - Выучить ...

//commands: add, list, done, delete, clear
switch (command) {
  case "add":
    const title = args.join(" ");
    if (!title) {
      console.log("Необходимо добавить задачу");
      process.exit(1);
    }
    addTask(title);
    break;

  case "list":
    const filter = args[0];
    listTasks(filter);
    break;

  case "done":
    const doneId = parseInt(args[0], 10);
    if (isNaN(doneId)) {
      console.log("Нужно указать корректный ID задачи");
      process.exit(1);
    }
    markTaskAsDone(doneId);
    break;

  case "delete":
    const deleteId = parseInt(args[0], 10);
    if (isNaN(deleteId)) {
      console.log("Нужно указать корректный ID задачи");
      process.exit(1);
    }
    deleteTask(deleteId);
    break;

  case "clear":
    clearTasks();
    break;

  case "edit":
    const editId = parseInt(args[0], 10);

    if (isNaN(editId)) {
      console.log("Нужно указать корректный ID задачи");
      process.exit(1);
    }

    const editedTitle = args[1] ?? "";

    if (!editedTitle) {
      console.log("Необходимо новое название задачи");
      process.exit(1);
    }

    editTask({ id: editId, title: editedTitle });

    break;

  default:
    console.log("Неизвестная команда");
    console.log("Доступные команды: add, list, done, delete, clear");
}
