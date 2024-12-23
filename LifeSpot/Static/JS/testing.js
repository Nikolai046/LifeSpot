<script>
    window.addEventListener("load", function() {
        let userName = prompt("Пожалуйста, введите ваше имя");
    alert(`Приветствуем, ${userName}. В вашем имени ${userName.length} символов`);

    // Перемещаем создание Map внутрь обработчика события,
    // чтобы переменная userName была доступна
    let userData = new Map();
    userData.set("Name", userName);
    userData.set("UserAgent", window.navigator.userAgent);

    // Исправляем синтаксис цикла for...of
    for (let [key, value] of userData) {
        console.log(key + ": " + value);
        }
    });
</script >