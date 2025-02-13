# Guess the number

Игра "Угадай число". Практика рекурсивных функций JavaScript. Цель игры - отгадать число, загаданное компьютером.

1. Создаем переменную `hiddenNumber`, которой будем присваивать случайное сгенерированное число.   
    ```
        let hiddenNumber = parseInt(Math.random() * 101);
    ```
2. Создаем рекурсивную функцию, в которой будет происходить процесс игры. Аргументом передаем загаданное число.  
    ```
    function startGame(hiddenNum) { 
        ...
    }
    ```
3. Создаем переменную `userNumber`, которой будем присваивать ответ пользователя. Запрашивать ответ у игрока будем с помощью функции prompt.
    ```
        let userNumber = prompt('Введите число от 0 до 100.');
    ```
4. Делаем проверку введенных данных.
    - при нажатии на кнопку "ok" функция prompt вернет пустую строку. Исключаем пустую строку, т.к. при приведении к типу Number оно дает цифру 0.
    ```
        if (userNumber === '') {
            alert('Вы ничего не ввели!');
            startGame(hiddenNum);
        }
    ```
    - при нажатии на кнупку отмена, функция prompt вернет null. В таком случае с помощью оператора return прерываем выполнение рекурсивного вызова функции и завершаем игру.
    ```
        if (userNumber === null) {
            alert('Вы нажали "отмена". До свидания!');
            return;
        }
    ```
5. Так как функция prompt возвращает ответ в строковом типе, то приводим значение к типу Number.
    ```
        userNumber = Number(userNumber);
    ```
6. С помощью ветвления сравниваем полученное значение и выдаем соответсвующее уведомление с помощью функции `alert()`. Если игрок угадал прерываем рекурсивный вызов функции и выдаем соответствующее сообщение пользователю.
    ```
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
    ```

7. Если игрок так и не угадал загаданное число продолжаем игру с помощью рекурсивного вызова функции.  
    ```
    function startGame(hiddenNum) {
    
        ...

        startGame(hiddenNum);
    }
    ```