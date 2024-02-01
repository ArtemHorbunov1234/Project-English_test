import { dataEnglish } from './dataFetcher.js';
import { historyIconData, historyIconHidden, valueInput } from './languageLearningApp.js';
import {
    historyIconWithoutData,
    tegLiLast,
    saveNum,
    meanValueCalculator,
    randomInteger,
} from './languageLearningApp.js';
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
const iconAddTeg = document.getElementById('iconAddTeg');
const historyIcon = document.getElementById('historyIcon');
const historyButton = document.getElementById('historyButton');
const iconMeanValue = document.getElementById('iconMeanValue');
const countCombo = document.getElementById('countCombo');
const historyIconBtnClear = document.getElementById('historyIconBtnClear');
const divElement = document.querySelector('#iconAddTeg');
const h2Elements = document.querySelectorAll('#icon h2');
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
export let numGood = Number(countGood.innerText);
export let numBad = Number(countBad.innerText);

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

btnStart.onclick = function () {
    btnStart.style.display = 'none';
    display.style.display = 'flex';
    randomNumber = randomInteger(1, 100);
    text.innerText = dataEnglish[randomNumber].translation;
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
        text.innerText = dataEnglish[randomNumber].translation;
    } else {
        ukraine.classList.add('border');
        text.innerText = dataEnglish[randomNumber].word;
    }
    state = !state;
};

imgAmendText.onclick = function () {
    randomNumber = randomInteger(1, 100);
    if (state === true) text.innerText = dataEnglish[randomNumber].word;
    else text.innerText = dataEnglish[randomNumber].translation;
};

btnStartPush.onclick = function () {
    let liLast = document.createElement('li');
    if (state === true) {
        if (valueInput.value === dataEnglish[randomNumber].translation) {
            alert('Good'), numGood++, numberOfCorrectAnswers++, (countGood.innerText = numGood);
            countCombo.innerText =
                numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            localStorage.setItem('countCombo', `${countCombo.innerText}`);
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);

            saveNum(numGood, numBad);
            liLast.innerHTML = tegLiLast(
                dataEnglish[randomNumber].translation,
                dataEnglish[randomNumber].word,
                numBad + numGood,
                'good'
            );
            iconAddTeg.appendChild(liLast);
        } else {
            alert(
                `${valueInput.value}не правильный ответ. Правильный ответ: ${dataEnglish[randomNumber].translation}  `
            ),
                numBad++,
                (countBad.innerText = numBad);
            numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            numberOfCorrectAnswers = 0;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            saveNum(numGood, numBad);

            liLast.innerHTML = tegLiLast(
                dataEnglish[randomNumber].translation,
                dataEnglish[randomNumber].word,
                numBad + numGood,
                'bad'
            );
            iconAddTeg.appendChild(liLast);
        }

        randomNumber = randomInteger(1, 100);
        text.innerText = dataEnglish[randomNumber].word;
    } else {
        if (valueInput.value === dataEnglish[randomNumber].word) {
            alert('Good'), numGood++, numberOfCorrectAnswers++, (countGood.innerText = numGood);
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            saveNum(numGood, numBad);

            countCombo.innerText =
                numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;

            liLast.innerHTML = tegLiLast(
                dataEnglish[randomNumber].word,
                dataEnglish[randomNumber].translation,
                numBad + numGood,
                'good'
            );
            iconAddTeg.appendChild(liLast);
        } else {
            alert(`${valueInput.value}не правильный ответ. Правильный ответ: ${dataEnglish[randomNumber].word} `),
                numBad++,
                (countBad.innerText = numBad);
            saveNum(numGood, numBad);

            numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            numberOfCorrectAnswers = 0;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);

            liLast.innerHTML = tegLiLast(
                dataEnglish[randomNumber].word,
                dataEnglish[randomNumber].translation,
                numBad + numGood,
                'bad'
            );
            iconAddTeg.appendChild(liLast);
        }

        randomNumber = randomInteger(1, 100);
        text.innerText = dataEnglish[randomNumber].translation;
    }
    historyIconHidden();

    valueInput.value = '';
};
iconActive.onclick = function () {
    visibilityIconMode = iconModeSwitch ? 'block' : 'none';
    iconMode.style.display = `${visibilityIconMode}`;
    iconModeSwitch = !iconModeSwitch;
};

h2Elements.forEach((element) => {
    element.onclick = function () {
        replacementMode.innerText = element.innerText;
        visibilityIconMode = iconModeSwitch ? 'block' : 'none';
        iconMode.style.display = `${visibilityIconMode}`;
        iconModeSwitch = !iconModeSwitch;
    };
});

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
