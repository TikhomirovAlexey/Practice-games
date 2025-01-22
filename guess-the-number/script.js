'use strict';

function startGame(hiddenNum) {
    let userNumber = prompt('Введите число от 0 до 100.');

    if (userNumber === '') {
        alert('Вы ничего не ввели!');
        startGame(hiddenNum);
    }

    if (userNumber === null) {
        alert('Вы нажали "отмена". До свидания!');
        return;
    }

    userNumber = Number(userNumber);

    if (isNaN(userNumber)) {
        alert('Нужно ввести число!');
    } else if (userNumber < hiddenNum) {
        alert('Вы ввели число меньше загаданного!');
    } else if (userNumber > hiddenNum) {
        alert('Вы ввели число больше загаданного!');
    } else if (userNumber === hiddenNum) {
        alert('Вы угадали!');
        return;
    }

    startGame(hiddenNum);
}

let hiddenNumber = parseInt(Math.random() * 101);

startGame(hiddenNumber);