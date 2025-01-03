//let age;
//let userData;
//checkAge();
if (!sessionStorage.getItem("Возраст пользователя")) {
    handleSession();
}
sessionLog();

setTimeout(() => alert("Нравится LifeSpot? " + '\n' + "Подпишитесь на наш Instagram @lifespot999!"), 30000);
function checkAge() {
    let age;
    while (true) {
        age = prompt("Пожалуйста введите ваш возраст");
        age = parseInt(age); // Преобразуем введённое значение в число
        // Проверяем, является ли введённое значение числом
        if (!isNaN(age)) {
            break; // Выход из цикла, если введено корректное число
        } else {
            alert("Пожалуйста, введите корректное число!");
        }
    }
    if (age >= 18) {
        alert("Приветствуем на LifeSpot");
    } else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет!");
        window.location.replace("https://google.com");
    }
    return age;
}

function handleSession() {
    sessionStorage.setItem("Возраст пользователя", checkAge());
    sessionStorage.setItem("Начало сессии", new Date().toLocaleString());
    sessionStorage.setItem("Данные пользователя", navigator.userAgent);
}

function sessionLog() {
    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) console.log(key + ': ' + sessionStorage[key]);
    }
}

const inputData = function () {
    return document.getElementById("myInput").value;
}

function filterContent() {
    const elements = document.querySelectorAll('.video-container > div');
    for (let i = 0; i < elements.length; i++) {
        const videoDescription = elements[i].getElementsByTagName('p')[0].innerText.toLowerCase();
        elements[i].style.display = videoDescription.includes(inputData()) ? 'block' : 'none';
    }
}