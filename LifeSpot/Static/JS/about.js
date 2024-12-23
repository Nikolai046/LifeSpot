class Review {
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
}

let reviewHandler = () => {
    const userName = getUserName();
    if (userName === null || userName.trim() === "") return;
    const reviewContent = getReview();
    if (reviewContent === null) return;

    const review = new Review(userName, reviewContent);

    //allReviews.push(review);

    alert("Спасибо за ваш отзыв!");
    displayReview(review);
}

function displayReview(review) {
    const reviewsContainer = document.getElementById("reviewsContainer");
    const reviewElement = document.createElement("div");
    reviewElement.className = "review-item";

    reviewElement.innerHTML = `
        <div class="review-header">
            <span>Пользователь: ${review.userName}</span>
            <span>${review.date.toLocaleString()}</span>
        </div>
        <div class="review-content">
            ${review.content}
        </div>`;
    reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
}