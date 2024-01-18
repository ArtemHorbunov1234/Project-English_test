const valueInput = document.getElementById('myInput');
const btnPush = document.getElementById('container_btn');
const text = document.getElementById('taskText');
const imgAmendText = document.getElementById('change_img');
const controlLanguage = document.getElementById('language');
const english = document.getElementById('language__english');
const ukraine = document.getElementById('language__ukr');
const countCorrect = document.getElementById('count__correct');
const btn = document.getElementById('btn');
const display = document.getElementById('active_display');
const iconActive = document.getElementById('normal_mode');
const icon = document.getElementById('icon');
const replacement = document.getElementById('replacement');
const iconNormal = document.getElementById('icon_normal');
const iconHard = document.getElementById('icon_hard');
let num = 0;
let value;
let state = false;
let randomNumber;
let iconSwitch = true;
let visibility;
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
    })
    .catch((error) => {
        console.error(error);
    });

btn.onclick = function () {
    btn.style.display = 'none';
    display.style.display = 'flex';

    randomNumber = randomInteger(1, 100);
    text.innerText = value[randomNumber].translation;
};

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

imgAmendText.onclick = function () {
    randomNumber = randomInteger(1, 100);
    if (state === true) text.innerText = value[randomNumber].word;
    else text.innerText = value[randomNumber].translation;
};

btnPush.onclick = function () {
    if (state === true) {
        if (valueInput.value === value[randomNumber].translation) alert('Good'), num++, (countCorrect.innerText = num);
        else
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].translation}  `),
                (num = 0),
                (countCorrect.innerText = num);
        randomNumber = randomInteger(1, 100);
        text.innerText = value[randomNumber].word;
    } else {
        if (valueInput.value === value[randomNumber].word) alert('Good'), num++, (countCorrect.innerText = num);
        else
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].word} `),
                (num = 0),
                (countCorrect.innerText = num);

        randomNumber = randomInteger(1, 100);

        text.innerText = value[randomNumber].translation;
    }

    valueInput.value = '';
};
iconActive.onclick = function () {
    visibility = iconSwitch ? 'block' : 'none';
    icon.style.display = `${visibility}`;
    iconSwitch = !iconSwitch;
};

iconNormal.onclick = function () {
    replacement.innerText = 'Normal';
    icon.style.display = 'none';
    iconSwitch = !iconSwitch;
};

iconHard.onclick = function () {
    replacement.innerText = 'Hard';
    icon.style.display = 'none';
    iconSwitch = !iconSwitch;
};
