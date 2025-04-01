const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

console.log('Привет! Загадано число от 1 до 100. Попробуй угадать!');

rl.on('line', (input) => {
  const guess = Number(input);
  ++attempts;

  if(isNaN(guess)) {
    console.log('Введите число!')
    return;
  }

  if(guess > secretNumber) {
    console.log('Меньше!');
  } else if (guess < secretNumber) {
    console.log('Больше!');
  } else {
    console.log(`Правильно! Загадано было число: ${secretNumber}. Вы угадали с попытки ${attempts}`);
    rl.close();
  }
});