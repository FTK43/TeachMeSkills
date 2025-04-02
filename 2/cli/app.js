const { addTask, editTask, listTasks, markTaskAsDone, deleteTask, clearTasks } = require('./taskManager');

const [,, command, ...args] = process.argv
// 0 - node
// 1 - app.js
// 2 - add
// 3 - Выучить ...

//commands: add, list, done, delete, clear
switch (command) {
  case 'add':
    const title = args.join(' ');
    if(!title){
      console.log('Необходимо добавить задачу');
      process.exit(1);
    }
    addTask(title);
    break;
  case 'edit':
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.log('Нужно указать корректный ID задачи');
      process.exit(1);
    }

    const newTitle = args.slice(1).join(' ');
    if (!newTitle) {
      console.log('Необходимо добавить новое название задачи');
      process.exit(1);
    }

    editTask(id, newTitle)
    break;

  case 'list':
    const filter = args[0];
    listTasks(filter);
    break;

  case 'done':
    const doneId = parseInt(args[0], 10);
    if(isNaN(doneId)){
      console.log('Нужно указать корректный ID задачи');
      process.exit(1);
    }
    markTaskAsDone(doneId);
    break;

  case 'delete':
    const deleteId = parseInt(args[0], 10);
    if(isNaN(deleteId)){
      console.log('Нужно указать корректный ID задачи');
      process.exit(1);
    }
    deleteTask(deleteId)
    break;

  case 'clear':
    clearTasks()
    break;

  default:
    console.log('Неизвестная команда');
    console.log('Доступные команды: add, list, done, delete, clear');
}
