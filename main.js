const valueInput = document.getElementById('myInput');
const btn = document.getElementById('btn');
const text = document.getElementById('taskText');
const imgAmendText = document.getElementById('change_img');
const controlLanguage = document.getElementById('language');
const english = document.getElementById('container__english');
const ukraine = document.getElementById('container__ukr');
let count = 0;
let value;
let state = false;
const arrayLanguage = [container__english, container__ukr];
fetch('https://6585c8f5022766bcb8c95bf4.mockapi.io/English', {
    method: 'Get',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        value = data;
        console.log(data[0].translation);
    })
    .catch((error) => {
        console.error(error);
    });

controlLanguage.onclick = function () {
    english.classList.remove('border');
    ukraine.classList.remove('border');
    if (state) {
        english.classList.add('border');
        text.innerText = value[randomNumber].translation;
    } else {
        ukraine.classList.add('border');
        text.innerText = value[randomNumber].word;
    }
    state = !state;
};

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNumber; // Начальное случайное число

imgAmendText.onclick = function () {
    randomNumber = randomInteger(1, 100);
    if (state === true) text.innerText = value[randomNumber].word;
    else text.innerText = value[randomNumber].translation;
};

btn.onclick = function () {
    if (state === true) {
        if (valueInput.value === value[randomNumber].translation) alert('Good');
        else alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].translation}  `);
        randomNumber = randomInteger(1, 100);
        text.innerText = value[randomNumber].word;
    } else {
        if (valueInput.value === value[randomNumber].word) {
            alert('Good');
        } else {
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].word}  `);
        }
        randomNumber = randomInteger(1, 100);

        text.innerText = value[randomNumber].translation;
    }

    valueInput.value = '';
};
