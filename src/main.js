import { value } from './dataFetcher.js';
const valueInput = document.getElementById('myInput');
const btnStartPush = document.getElementById('containerBtn');
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
const historyIconWithoutData = document.querySelector('.history__icon__withoutData');
const historyIconData = document.querySelector('.history__icon__data');
const countCombo = document.getElementById('countCombo');
const historyIconBtnClear = document.getElementById('historyIconBtnClear');
const divElement = document.querySelector('#iconAddTeg');
let state = false;
let randomNumber;
let iconModeSwitch = true;
let iconHistorySwitch = true;
let visibilityIconMode;
let visibilityIconHistory;
let numberOfCorrectAnswers = 0;
let savedCountCombo = parseInt(localStorage.getItem('countCombo')) || 0;
let savedNumGood = parseInt(localStorage.getItem('numGood')) || 0;
let savedNumBad = parseInt(localStorage.getItem('numBad')) || 0;
let savedIconMeanValue = parseInt(localStorage.getItem('meanValue')) || 0;
countCombo.innerHTML = savedCountCombo;
countGood.innerHTML = savedNumGood;
countBad.innerHTML = savedNumBad;
iconMeanValue.innerText = savedIconMeanValue;
let numGood = Number(countGood.innerText);
let numBad = Number(countBad.innerText);
const historyIconHidden = () => {
    const sumNum = numGood + numBad;
    if (sumNum >= 1) {
        historyIconWithoutData.style.display = 'none';
        historyIconData.style.display = 'flex';
    } else {
        historyIconWithoutData.style.display = 'flex';
        historyIconData.style.display = 'none';
    }
};
historyIconHidden();

historyIconBtnClear.onclick = function () {
    localStorage.setItem('countCombo', 0);
    localStorage.setItem('numGood', 0);
    localStorage.setItem('numBad', 0);
    countGood.innerHTML = 0;
    countBad.innerHTML = 0;
    countCombo.innerHTML = 0;

    numGood = Number(countGood.innerText);
    numBad = Number(countBad.innerText);

    divElement.innerHTML = '';
    historyIconWithoutData.style.display = 'flex';
    historyIconData.style.display = 'none';
};

const tegLiLast = function (value_1, value_2, nomination, name) {
    const tegLi = `
    <img width="18px" style="margin-left: 14px" src="/img/${name}.png" alt="" />
    <b id="icon_nomination">${nomination}.</b><span>${valueInput.value}</span>
    <img width="20px" src="/img/icon-right-arrow.png" alt="" />
    <span>${value_1}</span>
    <img width="20px" src="/img/icon-equal-mathematical-sign.png" alt="" />
    <span >${value_2}</span>`;
    localStorage.setItem(`'${nomination}'`, tegLi);
    return tegLi;
};

const saveNum = (numGood, numBad) => {
    localStorage.setItem('numGood', numGood);
    localStorage.setItem('numBad', numBad);
};

const meanValueCalculator = (countReplyGood, countReplyBad) => {
    const sumTask = countReplyBad + countReplyGood;
    const meanValue = ((countReplyGood / sumTask) * 100).toFixed(2);
    localStorage.setItem('meanValue', meanValue);
    return meanValue;
};

btnStart.onclick = function () {
    btnStart.style.display = 'none';
    display.style.display = 'flex';
    randomNumber = randomInteger(1, 100);
    text.innerText = value[randomNumber].translation;
    for (let a = 0; a <= numGood + numBad; a++) {
        const liLast = document.createElement('li');
        const liSaved = localStorage.getItem(`'${a}'`);
        liLast.innerHTML = liSaved;
        iconAddTeg.appendChild(liLast);
    }
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
            localStorage.setItem('countCombo', `${countCombo.innerText}`);
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);

            saveNum(numGood, numBad);
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
            saveNum(numGood, numBad);

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
            saveNum(numGood, numBad);

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
            saveNum(numGood, numBad);

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
    historyIconHidden();

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

iconHard.onclick = function () {
    replacementMode.innerText = 'Hard';
    icon.style.display = 'none';
    iconSwitch = !iconSwitch;
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
