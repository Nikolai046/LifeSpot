
    window.addEventListener("load", function() {
    const userName = prompt("Пожалуйста, введите ваше имя");
    alert(`Приветствуем, ${userName}. В вашем имени ${userName.length} символов`);
    const userData = new Map();
    userData.set("Name", userName);
    userData.set("UserAgent", window.navigator.userAgent);
    for (let [key, value] of userData) {
        console.log(key + ": " + value);
        }
    });

    const saveInput = function () {
        // Вытащим значение текстового поля (как у нас уже делается при фильтрации)
        const currentInput = document.getElementsByTagName("input")[0].value.toLowerCase();

        // Покажем окно с прошлым и новым значением
        alert(`Последний ввод: ${this.lastInput}\nТекущий ввод: ${currentInput}`);

        // Сохраним новое значение в контекст
        this.lastInput = currentInput;
    }
