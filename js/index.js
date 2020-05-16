'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
    const startBtn = document.querySelector('#btnOpenModal');
    const modalWindow = document.querySelector('#modalBlock');
    const closeModalBtn = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const answersForm = document.querySelector('#formAnswers');
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#prev');


    const questions = [
        {
            question: "Якого кольору  бургер?",
            answers: [
                {
                    id: 'standart',
                    title: 'Стандарт',
                    src: './image/burger.png'
                },
                {   
                    id: 'black',
                    title: 'Чорний',
                    src: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "З якого м'яса котлета?",
            answers: [
                {
                    id: 'chicken',
                    title: 'Курка',
                    src: './image/chickenMeat.png'
                },
                {
                    id: 'beef',
                    title: 'Яловичина',
                    src: './image/beefMeat.png'
                },
                {
                    id: 'pork',
                    title: 'Свинина',
                    src: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Додаткові інгредієнти?",
            answers: [
                {
                    id: 'tomato',
                    title: 'Помідор',
                    src: './image/tomato.png'
                },
                {
                    id: 'cucumber',
                    title: 'Огірок',
                    src: './image/cucumber.png'
                },
                {
                    id: 'cabbage',
                    title: 'Салат',
                    src: './image/salad.png'
                },
                {
                    id: 'onion',
                    title: 'Цибуля',
                    src: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавити соус?",
            answers: [
                {
                    id: 'garlic sauce',
                    title: 'Часниковий',
                    src: './image/sauce1.png'
                },
                {
                    id: 'tomato sauce',
                    title: 'Томатний',
                    src: './image/sauce2.png'
                },
                {
                    id: 'mustard sauce',
                    title: 'Гірчичний',
                    src: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    startBtn.addEventListener('click', () => {
        modalWindow.classList.add('d-block');
        test();
    });

    closeModalBtn.addEventListener('click', () => {
        modalWindow.classList.remove('d-block');
    });

    const test = () => {
        let numberQuestion = 0;

        prevBtn.classList.add('hidden');

        const showAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none">
                <label for="${answer.id}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.src}" alt="burger">
                    <span>${answer.title}</span>
                </label>
                `;

                answersForm.append(answerItem);
            });
        };

        const showQuestions = (index) => {
            answersForm.innerHTML = '';

            questionTitle.textContent = `${questions[index].question}`;

            showAnswers(index);
        };

        showQuestions(numberQuestion);

        nextBtn.onclick = () => {
            showQuestions(++numberQuestion);

            if (numberQuestion === questions.length - 1) {
                nextBtn.classList.add('hidden');
            } 

            prevBtn.classList.remove('hidden');
        };

        prevBtn.onclick = () => {
            showQuestions(--numberQuestion);

            if (numberQuestion === 0) {
                prevBtn.classList.add('hidden');
            }

            nextBtn.classList.remove('hidden');
        };
    };
});

