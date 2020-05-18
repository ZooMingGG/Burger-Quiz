'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
    const startBtn = document.querySelector('#btnOpenModal');
    const modalWindow = document.querySelector('#modalBlock');
    const modalDialog = document.querySelector('.modal-dialog');
    const modalTitle = document.querySelector('.modal-title');
    const closeModalBtn = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const answersForm = document.querySelector('#formAnswers');
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#prev');
    const sendBtn = document.querySelector('#send');

    const firebaseConfig = {
        apiKey: "AIzaSyCYr7Ukw286SE41-usHowBUEoythMKndOs",
        authDomain: "burger-quiz-6049f.firebaseapp.com",
        databaseURL: "https://burger-quiz-6049f.firebaseio.com",
        projectId: "burger-quiz-6049f",
        storageBucket: "burger-quiz-6049f.appspot.com",
        messagingSenderId: "312052132550",
        appId: "1:312052132550:web:42cac09cd318f06f1f85c7",
        measurementId: "G-QG3CPQ9RDF"
    };
  
    firebase.initializeApp(firebaseConfig);

    const getData = () => {
        answersForm.textContent = 'LOAD';

        questionTitle.textContent = '';
        modalTitle.textContent = '';

        nextBtn.classList.add('hidden');
        prevBtn.classList.add('hidden');

        firebase.database().ref().child('questions').once('value')
            .then(snap => test(snap.val()));
    };

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

        getData();
    });

    closeModalBtn.addEventListener('click', () => {
        modalWindow.classList.remove('d-block');
    });

    const test = (questions) => {
        const finalAnswers = [];
        let numberQuestion = 0;

        modalTitle.textContent = 'Дайте відповідь на питання:';

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
                modalTitle.textContent = '';

                answersForm.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Введіть свій номер тлефону</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>
                `;

                const phoneNumber = document.querySelector('#numberPhone');

                phoneNumber.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/[^0-9+-]/, '');
                });
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

            firebase
            .database()
            .ref()
            .child('contacts')
            .push(finalAnswers);

            console.log(finalAnswers);
        };
    };
});