import { value } from './dataFetcher.js';
const valueInput = document.getElementById('myInput');
const btnStartPush = document.getElementById('containerbtn');
const text = document.getElementById('taskText');
const imgAmendText = document.getElementById('changeImg');
const controlLanguage = document.getElementById('language');
const english = document.getElementById('languageEnglish');
const ukraine = document.getElementById('languageUkr');
const countBad = document.getElementById('countBabReply');
const countGood = document.getElementById('countGoodReply');
const btnStart = document.getElementById('btnStart');
const display = document.getElementById('activeDisplay');
const iconActive = document.getElementById('mode');
const iconMode = document.getElementById('icon');
const replacementMode = document.getElementById('replacementMode');
const iconNormal = document.getElementById('iconNormalMode');
const iconHard = document.getElementById('iconHardMode');
const iconAddTeg = document.getElementById('iconAddTeg');
const historyIcon = document.getElementById('historyIcon');
const historyButton = document.getElementById('historyButton');
const iconMeanValue = document.getElementById('iconMeanValue');
const countCombo = document.getElementById('countCombo');
let numGood = 0;
let numBad = 0;
let state = false;
let randomNumber;
let iconModeSwitch = true;
let iconHistorySwitch = true;
let visibilityIconMode;
let visibilityIconHistory;
let numberOfCorrectAnswers = 0;
const tegLiLast = function (value_1, value_2, nomination, img) {
    return `
    <img width="18px" style="margin-left: 14px" src="/img/${img}.png" alt="" />
    <b id="icon_nomination">${nomination}.</b><span>${valueInput.value}</span>
    <img width="20px" src="/img/icon-right-arrow.png" alt="" />
    <span>${value_1}</span>
    <img width="20px" src="/img/icon-equal-mathematical-sign.png" alt="" />
    <span >${value_2}</span>`;
};

const meanValueCalculator = (countReplyGood, countReplyBad) => {
    const sumTask = countReplyBad + countReplyGood;
    const meanValue = (countReplyGood / sumTask) * 100;
    return meanValue.toFixed(2);
};

btnStart.onclick = function () {
    btnStart.style.display = 'none';
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

btnStartPush.onclick = function () {
    let liLast = document.createElement('li');
    if (state === true) {
        if (valueInput.value === value[randomNumber].translation) {
            alert('Good'), numGood++, numberOfCorrectAnswers++, (countGood.innerText = numGood);
            countCombo.innerText =
                numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            liLast.innerHTML = tegLiLast(
                value[randomNumber].translation,
                value[randomNumber].word,
                numBad + numGood,
                'good'
            );
            iconAddTeg.appendChild(liLast);
        } else {
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].translation}  `),
                numBad++,
                (countBad.innerText = numBad);
            numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            numberOfCorrectAnswers = 0;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);

            liLast.innerHTML = tegLiLast(
                value[randomNumber].translation,
                value[randomNumber].word,
                numBad + numGood,
                'bad'
            );
            iconAddTeg.appendChild(liLast);
        }

        randomNumber = randomInteger(1, 100);
        text.innerText = value[randomNumber].word;
    } else {
        if (valueInput.value === value[randomNumber].word) {
            alert('Good'), numGood++, numberOfCorrectAnswers++, (countGood.innerText = numGood);
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            countCombo.innerText =
                numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;

            liLast.innerHTML = tegLiLast(
                value[randomNumber].word,
                value[randomNumber].translation,
                numBad + numGood,
                'good'
            );
            iconAddTeg.appendChild(liLast);
        } else {
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${value[randomNumber].word} `),
                numBad++,
                (countBad.innerText = numBad);
            console.log(countCombo.innerText);
            numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            numberOfCorrectAnswers = 0;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);

            liLast.innerHTML = tegLiLast(
                value[randomNumber].word,
                value[randomNumber].translation,
                numBad + numGood,
                'bad'
            );
            iconAddTeg.appendChild(liLast);
        }

        randomNumber = randomInteger(1, 100);
        text.innerText = value[randomNumber].translation;
    }

    valueInput.value = '';
};
iconActive.onclick = function () {
    visibilityIconMode = iconModeSwitch ? 'block' : 'none';
    iconMode.style.display = `${visibilityIconMode}`;
    iconModeSwitch = !iconModeSwitch;
};

iconNormal.onclick = function () {
    replacementMode.innerText = 'Normal';
    iconMode.style.display = 'none';
    iconModeSwitch = !iconModeSwitch;
};

historyButton.onclick = function (event) {
    event.stopPropagation();
    toggleHistoryIconVisibility();
};

document.body.onclick = function (event) {
    if (!historyIcon.contains(event.target) && iconHistorySwitch === false) {
        historyIcon.style.display = 'none';
        iconHistorySwitch = true;
    }
};

function toggleHistoryIconVisibility() {
    visibilityIconHistory = iconHistorySwitch ? 'block' : 'none';
    historyIcon.style.display = visibilityIconHistory;
    iconHistorySwitch = !iconHistorySwitch;
}
