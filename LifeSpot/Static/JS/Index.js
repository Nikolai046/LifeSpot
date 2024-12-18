
function getAccess() {
    let age;
    let userData = new Map();
    userData.set("sessionDate", new Date().toLocaleString());
    userData.set("UserAgent", window.navigator.userAgent);
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
    userData.set("userAge", age);
    if (age >= 18) {
        alert("Приветствуем на LifeSpot");
    } else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет!");
        window.location.replace("https://google.com");
    }
    for (let [key, value] of userData) {
        console.log(key + ": " + value);
    }
}

function filterContent() {
    document.getElementById("myInput").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();

        const elements = document.querySelectorAll('.video-container > div');
        for (let i = 0; i < elements.length; i++) {
            const videoDescription = elements[i].getElementsByTagName('p')[0].innerText.toLowerCase();
            elements[i].style.display = videoDescription.includes(searchText) ? 'block' : 'none';
        }
    });
}