// Hamburger Menu Functionality
const menu_btn = document.querySelector('.hamburger');
const mobile_menu = document.querySelector('.mobile-nav');
const overlay = document.getElementById("popup");

menu_btn.addEventListener('click', function () {
    menu_btn.classList.toggle('is-active');
    mobile_menu.classList.toggle('is-active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    menu_btn.classList.toggle('is-active');
    mobile_menu.classList.toggle('is-active');
    overlay.classList.toggle('active')
});



//Pet Carousel Functionality
import { petCollection as pets } from './pets.js';

const sliderCards = document.querySelector(".slider__cards");
const sliderArrowRight = document.querySelector(".slider__arrow_right");
const sliderArrowLeft = document.querySelector(".slider__arrow_left");

const sliderCardsLeft = document.querySelector(".slider__cards_left");
const sliderCardsCenter = document.querySelector(".slider__cards_center");
const sliderCardsRight = document.querySelector(".slider__cards_right");

const testimonialsCards = document.querySelector(".testimonials__cards");
const testimonialsInput = document.querySelector(".testimonials__input");

let windowInnerWidth = window.innerWidth;

let bgBlockControls = true;

const startCardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let shuffleCardArray = [];
let centrCardArray = [];
let leftRightCardArray = [];
let countStepCardArray = 6;

// testimonialsInput.value = 0;
// testimonialsInput.min = 0;
// testimonialsInput.max = 7;
// testimonialsInput.step = 1;

let stapTransformTestimonials = 100 / 4;

function updateCountStepCardArray() {
    if (windowInnerWidth >= 1000) {
        countStepCardArray = 6;
    } else if (windowInnerWidth > 630 && windowInnerWidth < 1000) {
        countStepCardArray = 4;
    } else {
        countStepCardArray = 2;
    }
    // return countStepCardArray;
}
updateCountStepCardArray();

// function UpdateStapTransformTestimonials() {
//     if (windowInnerWidth > 1280) {
//         stapTransformTestimonials = 100 / 4;
//     } else {
//         stapTransformTestimonials = 100 / 3;
//     }
// }
// UpdateStapTransformTestimonials();

// function updatetesTimonialsInputMax() {
//     if (windowInnerWidth > 1280) {
//         testimonialsInput.max = 7;
//     } else {
//         testimonialsInput.max = 8;
//     }
// }
// updatetesTimonialsInputMax();

// Start from screen width number of cards
window.addEventListener("resize", function() {
    windowInnerWidth = window.innerWidth;
    testimonialsInput.value = 0;
    testimonialsCards.style.transform = `translateX(0)`;
    updateCountStepCardArray();
    UpdateStapTransformTestimonials();
    updatetesTimonialsInputMax();

    sliderCardsLeft.innerHTML = "";
    sliderCardsCenter.innerHTML = "";
    sliderCardsRight.innerHTML = "";
    startgenerareArraysCards();
    addCardsFromArray(centrCardArray, addSliderCardsCenter);
    addCardsFromArray(leftRightCardArray, addSliderCardsLeftAndRight);
});
// End of screen width number of cards

// Start Array shuffling function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// End Array Shuffle Function

// Beginning we form arrays of cards

function startgenerareArraysCards(params) {
    shuffleCardArray = startCardArray.slice(0);
    shuffleCardArray = shuffle(shuffleCardArray);
    centrCardArray = shuffleCardArray.splice(0, countStepCardArray);
    leftRightCardArray = shuffleCardArray.splice(0, countStepCardArray);
}
startgenerareArraysCards();

// The end we form arrays of cards

//  Start filling cards

function addCardsFromArray(array, cardFunction) {
    array.forEach((id, index, array) => {
        cardFunction(id);
    });
}

function addSliderCardsLeftAndRight(id) {
    sliderCardsLeft.append(createCard(id));
    if (windowInnerWidth > 630) {
        sliderCardsRight.append(createCard(id));
    }
}

function addSliderCardsCenter(id) {
    sliderCardsCenter.append(createCard(id));
}

addCardsFromArray(centrCardArray, addSliderCardsCenter);
addCardsFromArray(leftRightCardArray, addSliderCardsLeftAndRight);

// End of filling cards

sliderCards.addEventListener("transitionstart", (e) => {
    if (
        e.target.className === "slider__cards" &&
        e.propertyName === "transform"
    ) {
        setTimeout(() => {
            bgBlockControls = false;
        }, 50);
    }
});

sliderCards.addEventListener("transitionend", (e) => {
    if (
        e.target.className === "slider__cards" &&
        e.propertyName === "transform"
    ) {
        setTimeout(() => {
            bgBlockControls = true;
        }, 50);
        sliderCardsCenter.innerHTML = "";
        addCardsFromArray(leftRightCardArray, addSliderCardsCenter);
        sliderCards.style.transitionDuration = "0s";
        sliderCards.style.transform = `translateX(${0}%)`;

        shuffleCardArray = Array.from(
            new Set(shuffleCardArray.concat(centrCardArray))
        );
        shuffleCardArray = shuffle(shuffleCardArray);

        centrCardArray = leftRightCardArray.slice(0);
        leftRightCardArray = shuffleCardArray.splice(0, countStepCardArray);

        sliderCardsLeft.innerHTML = "";
        sliderCardsRight.innerHTML = "";
        addCardsFromArray(leftRightCardArray, addSliderCardsLeftAndRight);
    }
});

sliderArrowRight.addEventListener("click", () => {
    if (bgBlockControls) {
        sliderCards.style.transitionDuration = "1.5s";
        sliderCards.style.transform = `translateX(${-100}%)`;
    }
});

sliderArrowLeft.addEventListener("click", () => {
    if (bgBlockControls) {
        sliderCards.style.transitionDuration = "1.5s";
        sliderCards.style.transform = `translateX(${100}%)`;
    }
});

function createCard(id) {
    let sliderCard = document.createElement("div");
    sliderCard.classList.add("slider__card");
    // sliderCards.append(sliderCard)

    let imgCard = document.createElement("img");
    imgCard.src = pets[id].image;
    sliderCard.append(imgCard);

    let sliderCardWrapper = document.createElement("div");
    sliderCardWrapper.classList.add("slider__card__wrapper");
    sliderCard.append(sliderCardWrapper);

    let divWrapperNull = document.createElement("div");
    sliderCardWrapper.append(divWrapperNull);

    let sliderCardTitle = document.createElement("h5");
    sliderCardTitle.classList.add("slider__card__title");
    sliderCardTitle.textContent = pets[id].name;
    divWrapperNull.append(sliderCardTitle);

    let sliderCardDescription = document.createElement("div");
    sliderCardDescription.classList.add("slider__card__description");
    sliderCardDescription.textContent = pets[id].location;
    divWrapperNull.append(sliderCardDescription);

    let sliderCardImg = document.createElement("div");
    sliderCardImg.classList.add("slider__card__img");
    sliderCardWrapper.append(sliderCardImg);

    let sliderCardEat = document.createElement("img");
    sliderCardEat.src = pets[id].meal;
    sliderCardImg.append(sliderCardEat);

    return sliderCard;
}

// End Slider Pets







const testimonials = document.querySelectorAll('.testimonial-item');

for (let testimonial of testimonials) {
    testimonial.onclick = e => {
        if (e.target.classList.contains('testimonial-item')) {
            console.log(e.target);
        }
    };
}