'use strict';

const buttonsActions = document.querySelector('.buttons-actions');
const buttonsStartStop = document.querySelector('.buttons-start-stop');
const inputEl = document.querySelector('.input');
const textForUserInfo = document.querySelector('.text-for-user-info');
const userAnswerBox = document.querySelector('.user-answer-box');
const bullsCount = document.querySelector('.bulls-count');
const cowsCount = document.querySelector('.cows-count');

/**
 * Событие проверки ответа и очистки поля
 */
buttonsActions.addEventListener('click', madeActionsEvent);

/**
 * Событие рестарта и остановки игры
 */
buttonsStartStop.addEventListener('click', madeStartStopEvent);

/**
 * Функция для события клика кнопок "ответить" и "очистить"  
 */
function madeActionsEvent(event) {
    if (event.target.classList.contains('button-answer')) {
        const userAnswerArrayWithStrings = inputEl.value.split('');
        if (userAnswerArrayWithStrings.length == 0 || userAnswerArrayWithStrings.length > 4) {
            getInfoForUser('Необходимо ввести число из&nbsp;4&nbsp;цифр!');
            return;
        }
        if (checkForIdenticalNumbers(userAnswerArrayWithStrings)) {
            getInfoForUser('Цифры не должны повторяться!');
            return;
        }
        const userAnswer = userAnswerArrayWithStrings.map(item => Number(item));
        addAnswerInUserAnswerBox(userAnswer);
        const BullsAndCowsCount = checkAnswer(userAnswer);
        printCountCowsAndBulls(BullsAndCowsCount);
        if (BullsAndCowsCount.bulls === 4) {
            getInfoForUser('Победа! Сыграем еще? Жми &laquo;начать заново!&raquo;');
            buttonsActions.removeEventListener('click', madeActionsEvent);
            buttonsActions.classList.add('is-disabled');
        } else getInfoForUser(getRandomAnswerForUser());
    }
    if (event.target.classList.contains('button-reset')) {
        resetInput();
    }
}

/**
 * Функция для события клика кнопок "начать заново" и "закончить"  
 */
function madeStartStopEvent(event) {
    if (event.target.classList.contains('button-restart')) {
        resetInput();
        resetBoxUserAnswer();
        resetCountCowsAndBulls();
        getInfoForUser('Введите число из&nbsp;4&nbsp;цифр.');
        startGame();
        buttonsActions.addEventListener('click', madeActionsEvent);
        if (buttonsActions.classList.contains('is-disabled')) 
            buttonsActions.classList.remove('is-disabled');
    }
    if (event.target.classList.contains('button-stop')) {
        resetInput();
        resetBoxUserAnswer();
        resetCountCowsAndBulls();
        getInfoForUser(`До свидания! Загаданное число - ${riddle.join('')}`);
        buttonsActions.removeEventListener('click', madeActionsEvent);
        buttonsActions.classList.add('is-disabled');
    }
}

/**
 * Функция проверяет наличие повторений введенных цифр в числе пользователя
 * @param {Array<string>} userAnswerArrayWithStrings 
 * @returns {boolean} 
 */
function checkForIdenticalNumbers(userAnswerArrayWithStrings) {

    for (let i = 0; i < userAnswerArrayWithStrings.length - 1; i++) {
        for (let j = i + 1; j < userAnswerArrayWithStrings.length; j++) {
            if (userAnswerArrayWithStrings[i] === userAnswerArrayWithStrings[j]) 
                return true;
        }
    }

    return false;
}

/**
 * Функция генерирует случайное число от 0 до max
 * @param {number} max Максимальный показатель промежутка генерации цифры
 * @returns {number} Случайная цифра
 */
function getRandomNumber(max) {
    return parseInt(Math.random() * max);
}

/**
 *  Функция вставляет в html разметку случайную строку с ответом
 * @returns {string} случайная строка с ответом
 */
function getRandomAnswerForUser() {
    const arrayAnswers = [
        'Неплохо! Попробуйте еще!',
        'Не сдавайтесь! Победа близка!',
        'Хорошая попытка, продолжаем!',
        'Так держать! Вы&nbsp;молодец, но&nbsp;надо попробовать еще раз!'
    ];

    const randNum = getRandomNumber(arrayAnswers.length);

    return arrayAnswers[randNum];
}

/**
 * Функция вставляет в html разметку количество быков и коров
 * @param {Object} countBullsAndCows Объект с количеством быков и коров
 */
function printCountCowsAndBulls(countBullsAndCows) {
    bullsCount.textContent = countBullsAndCows.bulls;
    cowsCount.textContent = countBullsAndCows.cows;
}

/**
 * Функция обнудения счетчика быков и коров в html разметке
 */
function resetCountCowsAndBulls() {
    bullsCount.textContent = 0;
    cowsCount.textContent = 0;
}

/**
 * Функция чистит поле ответов пользователей
 */
function resetBoxUserAnswer() {
    userAnswerBox.textContent = '';
}

/**
 * Функция чистит поле ввода
 */
function resetInput() {
    inputEl.value = '';
}

/**
 * Функция вставляет строку в html элемент
 * @param {string} string 
 */
function getInfoForUser(string) {
    textForUserInfo.innerHTML = string;
}

/**
 * Функция вставляет в html разметку вариант ответа пользователя
 * @param {Array<number>} answer Массиф из цифр 
 */
function addAnswerInUserAnswerBox(answer) {
    userAnswerBox.insertAdjacentHTML('afterbegin', `<p class="text">${answer.join('')}</p>`);
}


/**
 * Функция генерирует массив загаданных цифр
 * @returns {Array<number>} Возвращает массив загаданных цифр
 */
function getRiddle() {
    let riddleArray = [];

    while (true) {

        let randomNumber = getRandomNumber(10);
        if (!riddleArray.includes(randomNumber)) riddleArray.push(randomNumber);

        if (riddleArray.length == 4) return riddleArray;
    }
}

/**
 * Функция считает количество быков
 * @param {Array<number>} answer 
 * @returns {number} Возвращает количество быков
 */
function getCountBulls(answer) {
    let countBulls = 0
    for (let i = 0; i < riddle.length; i++) {
        if (answer[i] === riddle[i]) countBulls++;
    }
    return countBulls;
}

/**
 * Функция считает количество коров
 * @param {Array<number>} answer 
 * @returns {number} Возвращает количество коров
 */
function getCountCows(answer) {
    let countCows = 0
    for (let item of answer) {
        if (riddle.includes(item)) countCows++;
    }
    return countCows;
}

/**
 * Функция проверяет ответ пользователя.
 * @param {Array<number>} answer Массиф из цифр 
 * @returns {Object} ОбЪект с количеством быков и коров
 */
function checkAnswer(answer) {

    const tmpBulls = getCountBulls(answer);
    const tmpCows = getCountCows(answer);

    return {
        bulls: tmpBulls,
        cows: tmpCows - tmpBulls
    }
}

/**
 * Функция начинает игру
 */
function startGame() {
    riddle = getRiddle();
}

let riddle = null;

startGame();