let age;

while (true) {
    age = prompt('Пожалуйста введите ваш возраст');
    age = parseInt(age);  // Преобразуем введённое значение в число

    // Проверяем, является ли введённое значение числом
    if (!isNaN(age)) {
        break;  // Выход из цикла, если введено корректное число
    } else {
        alert('Пожалуйста, введите корректное число!');
    }
}

if (age >= 18) {
    alert("Приветствуем на LifeSpot");
} else {
    alert('Наши трансляции не предназначены для лиц моложе 18 лет!');
    window.location.replace('https://google.com');
}

let userData = new Map();
userData.set('userAge', age);
userData.set('sessionDate', new Date().toLocaleString());
userData.set('UserAgent', window.navigator.userAgent);

// Исправляем синтаксис цикла for...of
for (let [key, value] of userData) {
    console.log(key + ': ' + value);
}
