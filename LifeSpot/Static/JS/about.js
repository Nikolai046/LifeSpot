class Comment {
    constructor(userName, content) {
        this.userName = userName;
        this.content = content;
        this.date = new Date();
    }
}

//let allReviews = [];
function getUserName() {
    const userName = prompt("Пожалуйста, введите ваше имя");
    return userName;
}

let getReview = () => {
    while (true) {
        const reviewContent = prompt("Оставьте здесь отзыв о работе сайта");
        if (reviewContent !== null && reviewContent.trim() !== "") {
            return reviewContent;
        }
        if (reviewContent === null) return null;
        alert("Поле не может быть пустым");
    }
};

let reviewHandler = () => {
    const userName = getUserName();
    if (userName === null || userName.trim() === "") return;
    const reviewContent = getReview();
    if (reviewContent === null) return;
    const enableLikes = confirm("Разрешить пользователям оценивать ваш отзыв?");

    const comment = new Comment(userName, reviewContent);
    if (enableLikes) {
        const review = Object.create(comment);
        review.rate = 0;
        console.log(enableLikes);

        displayReview(review);
    } else {
        alert("Спасибо за ваш отзыв!");
        displayReview(comment);
    }
    //allReviews.push(review);
};
function addLike(button) {
    const currentText = button.innerText;
    let currentLikes = parseInt(currentText.split(" ")[1]);
    currentLikes++;
    button.innerText = `❤️ ${currentLikes}`;
}

function displayReview(review) {
    let likeCounter = "";
    const reviewsContainer = document.getElementById("reviewsContainer");
    const reviewElement = document.createElement("div");
    reviewElement.className = "review-item";

    if (review.hasOwnProperty("rate")) {
        likeCounter += `<button style="padding: 0 0.2em" " onclick=addLike(this)>❤️ ${review.rate}</button>`;
    }

    reviewElement.innerHTML = `
        <div class="review-header">
            <span>Пользователь: ${review.userName}${likeCounter}</span>
            <span>${review.date.toLocaleString()}</span>
        </div>
        <div class="review-content">
            ${review.content}
        </div>`;
    reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
}

/*************************************************************/
/************      ДЗ HW-03    *******************************/
/*************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const images = carousel.querySelectorAll('img');

    let currentIndex = 0;
    let isMouseDown = false;
    let startX;
    let currentTranslateX = 0;
    let isMoving = false;

    // Запрещаем стандартное поведение перетаскивания на изображениях
    images.forEach(img => {
        img.addEventListener('dragstart', function (e) {
            e.preventDefault(); // Останавливаем стандартное поведение "drag" для изображений
        });
    });

    // Функция для расчета положения кнопок навигации
    function positionButtons() {
        const carouselWidth = carousel.offsetWidth;
        const itemWidth = images[0].offsetWidth;
        const offset = (carouselWidth - itemWidth) / 2; //Кнопки по краям картинки
        prevButton.style.left = `${offset}px`;
        nextButton.style.right = `${offset}px`;
    }

    // Вызов перерасчета положения кнопок при изменении размеров окна и при обновлении
    window.addEventListener('load', positionButtons);
    window.addEventListener('resize', positionButtons);

    // Функция для обновления позиции карусели
    function updateCarousel() {
        const offset = -currentIndex * 100;
        // console.log(offset);
        carousel.style.transition = 'transform 0.5s ease'; // Плавное переключение с увеличенной продолжительностью
        carousel.style.transform = `translateX(${offset}%)`;
        updateIndicators();
    }

    // Функция для создания индикаторов
    function createIndicators() {
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            indicator.addEventListener('click', function () {
                currentIndex = i;
                updateCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Функция для обновления активного индикатора
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Функция для перехода на следующий слайд
    function nextSlide() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            // console.log('nextSlide ' + currentIndex);
            updateCarousel();
        } else {
            //  console.log('nextSlide ' + currentIndex);
            updateCarousel();
        }
    }

    // Функция для перехода на предыдущий слайд
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            //  console.log('prevSlide ' + currentIndex);
            updateCarousel();
        }
        else {
            currentIndex = 0;
            //   console.log('prevSlide ' + currentIndex);
            updateCarousel();
        }
    }

    // Обработчик события для захвата мышью
    carousel.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return; // Игнорируем, если не левая кнопка мыши
        isMouseDown = true;
        startX = e.clientX;
        carousel.style.cursor = 'grabbing'; // Изменяем курсор при захвате
        carousel.setPointerCapture(e.pointerId);
    });

    // Обработчик события для перемещения мыши
    carousel.addEventListener('pointermove', function (e) {
        if (!isMouseDown) return; // Если не нажата кнопка мыши, то ничего не делаем
        isMoving = true;
        const x = e.clientX;
        const moveDistance = (x - startX); // Расстояние, на которое сдвигается карусель
        currentTranslateX = (moveDistance / carousel.offsetWidth) * 100;
        //  console.log('currentTranslateX=', currentTranslateX);
        carousel.style.transition = 'none'; // Отключаем анимацию при перетаскивании
        carousel.style.transform = `translateX(${-currentIndex * 100 + currentTranslateX}%)`;
    });

    // Обработчик события для отпускания кнопки мыши
    carousel.addEventListener('pointerup', finishCarouselMove);

    // Обработчик события для выхода курсора за пределы окна
    document.addEventListener('pointermove', function (e) {
        if (e.clientX < 0 || e.clientX > window.innerWidth || e.clientY < 0 || e.clientY > window.innerHeight) {
            finishCarouselMove(); // Если курсор ушел за пределы окна
        }
    });

    function finishCarouselMove() {
        if (!isMoving) return; // Если карусель не двигалась, не делаем ничего
        isMouseDown = false; // Сбрасываем состояние захвата
        isMoving = false; // Сбрасываем состояние перемещения
        carousel.style.cursor = 'grab'; // Возвращаем обычный курсор

        // Проверяем, если сдвиг был более чем на % от ширины слайда
        const walk = Math.abs(currentTranslateX); // Сдвиг относительно текущего индекса

        if (walk > 10) { // Если сдвиг больше % от ширины слайда
            if (currentTranslateX > 0) {
                prevSlide(); // Переходим к предыдущему слайду
            } else if (currentTranslateX < 0) {
                nextSlide(); // Переходим к следующему слайду
            }
        } else {
            updateCarousel(); // Возвращаем карусель на исходную позицию
        }
    }

    // Прокручиваем карусель с помощью колесика мыши
    carousel.addEventListener('wheel', function (event) {
        if (event.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        event.preventDefault();
    });

    // Слушатели для кнопок
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Инициализация карусели
    createIndicators();
    updateCarousel();
});