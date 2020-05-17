'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
    const startBtn = document.querySelector('#btnOpenModal');
    const modalWindow = document.querySelector('#modalBlock');
    const modalDialog = document.querySelector('.modal-dialog');
    const closeModalBtn = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const answersForm = document.querySelector('#formAnswers');
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#prev');
    const sendBtn = document.querySelector('#send');


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


    let count = -100;

    modalDialog.style.top = count;

    const animateModal = function() {
        modalDialog.style.top = count + '%';
        count += 4;
        
        if (count < 0) {
            requestAnimationFrame(animateModal);
        } else {
            count = -100;
        }
    };

    startBtn.addEventListener('click', () => {
        requestAnimationFrame(animateModal);

        modalWindow.classList.add('d-block');

        test();
    });

    closeModalBtn.addEventListener('click', () => {
        modalWindow.classList.remove('d-block');
    });

    const test = () => {
        const finalAnswers = [];
        let numberQuestion = 0;

        const showAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none" value="${answer.title}">
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

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[index].question}`;

                showAnswers(index);

                nextBtn.classList.remove('hidden');
                prevBtn.classList.remove('hidden');
                sendBtn.classList.remove('d-block');
            }

            if (numberQuestion === 0) {
                prevBtn.classList.add('hidden');
            } 

            if (numberQuestion === questions.length) {
                nextBtn.classList.add('hidden');
                prevBtn.classList.add('hidden');
                sendBtn.classList.add('d-block');

                questionTitle.textContent = '';

                answersForm.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Введіть свій номер тлефону</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>
                `;
            }

            if (numberQuestion === questions.length + 1) {
                questionTitle.textContent = '';
                answersForm.textContent = 'Дякуємо за пройдений тест!';

                sendBtn.classList.remove('d-block');

                setTimeout( () => {
                    modalWindow.classList.remove('d-block');
                }, 2000);
            }
        };

        showQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {};

            const inputs = [...answersForm.elements].filter((input) => input.checked || input.id === 'numberPhone');

            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj[`Номер телефону`] = input.value;
                }
            });

            finalAnswers[numberQuestion] = obj;
        };

        nextBtn.onclick = () => {
            checkAnswer();
            showQuestions(++numberQuestion);
        };

        prevBtn.onclick = () => {
            showQuestions(--numberQuestion);
        };

        sendBtn.onclick = () => {
            checkAnswer();
            showQuestions(++numberQuestion);
        };
    };
});

