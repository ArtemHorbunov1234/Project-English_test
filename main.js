const valueInput = document.getElementById('myInput');
const btn = document.getElementById('btn');
const text = document.getElementById('taskText');
const imgAmendText = document.getElementById('change_img');
const controlLanguage = document.getElementById('language');
const english
const 
let value;
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

};
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNumber; // Начальное случайное число

imgAmendText.onclick = function () {
    randomNumber = randomInteger(1, 100);
    console.log(randomNumber);

    text.innerText = value[randomNumber].word;
};

btn.onclick = function () {
    if (valueInput.value === value[randomNumber].translation) {
        alert('Good');
    } else {
        alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].translation}  `);
    }
    randomNumber = randomInteger(1, 100);

    text.innerText = value[randomNumber].word;
    valueInput.value = '';
};
