import { value } from './dataFetcher.js';
const valueInput = document.getElementById('myInput');
const btnPush = document.getElementById('container_btn');
const text = document.getElementById('taskText');
const imgAmendText = document.getElementById('change_img');
const controlLanguage = document.getElementById('language');
const english = document.getElementById('language__english');
const ukraine = document.getElementById('language__ukr');
const countBad = document.getElementById('count__bab');
const countGood = document.getElementById('count__good');
const btn = document.getElementById('btn');
const display = document.getElementById('active_display');
const iconActive = document.getElementById('normal_mode');
const icon = document.getElementById('icon');
const replacement = document.getElementById('replacement');
const iconNormal = document.getElementById('icon_normal');
const iconHard = document.getElementById('icon_hard');
const iconAdd = document.getElementById('icon_add');
let numGood = 0;
let numBad = 0;
let nomination;
let state = false;
let randomNumber;
let iconSwitch = true;
let visibility;

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
    let liLast = document.createElement('li');
    if (state === true) {
        if (valueInput.value === value[randomNumber].translation) {
            alert('Good'), numGood++, (countGood.innerText = numGood);
            nomination = numBad + numGood;

            liLast.innerHTML = `
        <img width="18px" style="margin-left: 14px" src="/img/good.png" alt="" />
        <b id="icon_nomination">${nomination}.</b><span>${valueInput.value}</span>
        <img width="20px" src="/img/icon-right-arrow.png" alt="" />
        <span>${value[randomNumber].word}</span>
        <img width="20px" src="/img/icon-equal-mathematical-sign.png" alt="" />
        <span >${value[randomNumber].translation}</span>`;
            iconAdd.appendChild(liLast);
        } else {
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].translation}  `),
                numBad++,
                (countBad.innerText = numBad);
            nomination = numBad + numGood;

            liLast.innerHTML = `
                <img width="18px" style="margin-left: 14px" src="/img/bad.png" alt="" />
                <b id="icon_nomination">${nomination}.</b><span>${valueInput.value}</span>
                <img width="20px" src="/img/icon-right-arrow.png" alt="" />
                <span>${value[randomNumber].translation}</span>
                <img width="20px" src="/img/icon-equal-mathematical-sign.png" alt="" />
                <span >${value[randomNumber].word}</span>`;
            iconAdd.appendChild(liLast);
        }
        randomNumber = randomInteger(1, 100);
        text.innerText = value[randomNumber].word;
    } else {
        if (valueInput.value === value[randomNumber].word) alert('Good'), numGood++, (countGood.innerText = numGood);
        else
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].word} `),
                numBad++,
                (countBad.innerText = numBad);

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
