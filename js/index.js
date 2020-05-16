'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
    const startBtn = document.querySelector('#btnOpenModal');
    const modalWindow = document.querySelector('#modalBlock');
    const closeModalBtn = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const answersForm = document.querySelector('#formAnswers');

    startBtn.addEventListener('click', () => {
        modalWindow.classList.add('d-block');
        test();
    });

    closeModalBtn.addEventListener('click', () => {
        modalWindow.classList.remove('d-block');
    });

    const test = () => {
        const showQuestions = () => {
            questionTitle.textContent = 'Якого кольору бургер ви хочете?';

            answersForm.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="./images/burger.png" alt="burger">
                    <span>Стандарт</span>
                </label>
            </div>
            <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="./images/burgerBlack.png" alt="burger">
                    <span>Черный</span>
                </label>
            </div>
            `;
        };

        showQuestions();
    };
});

