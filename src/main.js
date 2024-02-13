import {
    historyIconData,
    historyIconHidden,
    valueInput,
    iconText,
    replyPopup,
    clockTime,
    deleteColorTime,
    clockTimeHidden,
} from './languageLearningApp.js';
import { dataFetch } from './dataFetcher.js';
import {
    historyIconWithoutData,
    tegLiLast,
    saveNum,
    meanValueCalculator,
    randomInteger,
    time,
    arrayTimerSecond,
} from './languageLearningApp.js';
const btnStartPush = document.getElementById('containerBtn');
const text = document.getElementById('taskText');
const imgAmendText = document.getElementById('changeImg');
const controlLanguage = document.getElementById('language');
const english = document.getElementById('languageEnglish');
const ukraine = document.getElementById('languageUkr');
const countBad = document.getElementById('countBabReply');
const countGood = document.getElementById('countGoodReply');
export const btnStart = document.getElementById('btnStart');
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
const response = document.getElementById('response');
const btnMenu = document.getElementById('btnMenu');
const menuWidgets = document.querySelector('.container__menu__widgets');
const hintWord = document.getElementById('hintWord');
const hintBottom = document.getElementById('hintBottom');
const hintTop = document.getElementById('hintTop');
export const timeSelectionAll = document.querySelectorAll('#timeSelection b');
const timer = document.getElementById('timer');

let databaseSelection = 0;
let stateLanguage = false;
let randomNumber;
let iconModeSwitch = true;
let iconHistorySwitch = true;
let visibilityIconMode;
let visibilityIconHistory;
let numberOfCorrectAnswers = 0;
let stateIconWidgets = false;
let lengthCalculation = 0;

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

btnStart.onclick = function () {
    btnStart.style.display = 'none';
    display.style.display = 'flex';
    randomNumber = randomInteger(1, 100);
    text.innerText = dataFetch[0][randomNumber].translation;
    for (let a = 0; a <= numGood + numBad; a++) {
        const liLast = document.createElement('li');
        const liSaved = localStorage.getItem(`'${a}'`);
        liLast.innerHTML = liSaved;
        iconAddTeg.appendChild(liLast);
    }
};

btnMenu.onclick = function () {
    let visibilityIconWidgets = stateIconWidgets ? 'flex' : 'none';
    menuWidgets.style.display = `${visibilityIconWidgets}`;
    stateIconWidgets = !stateIconWidgets;
    btnMenu.style.transform = `translate(-256px, 1px) ${stateIconWidgets ? 'rotate(-180deg)' : 'rotate(360deg)'}`;
};

clockTime.addEventListener('click', function () {
    clockTimeHidden();
});

hintWord.addEventListener('click', function () {
    const array = [];
    const array_text = [];
    hintBottom.style.display = 'block';
    hintTop.style.display = 'block';
    let a = 0;
    let keyText = stateLanguage ? 'translation' : 'word';
    const b = dataFetch[databaseSelection][randomNumber][keyText].length;
    array.push(' _ '.repeat(b));

    while (lengthCalculation >= a) {
        array_text.push(dataFetch[databaseSelection][randomNumber][keyText][`${a}`]);
        a++;
    }
    while (b > array_text.length) {
        array_text.push(` # `);
    }

    hintBottom.innerText = array.join('');
    hintTop.innerText = array_text.join(' ');

    lengthCalculation++;
});

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

controlLanguage.onclick = function () {
    english.classList.remove('border');
    ukraine.classList.remove('border');
    if (stateLanguage) {
        english.classList.add('border');
        text.innerText = dataFetch[databaseSelection][randomNumber].translation;
        valueInput.placeholder = 'писати англійською';
    } else {
        ukraine.classList.add('border');
        text.innerText = dataFetch[databaseSelection][randomNumber].word;
        valueInput.placeholder = 'писати українською';
    }
    stateLanguage = !stateLanguage;
    resetHint();
};

imgAmendText.onclick = function () {
    randomNumber = randomInteger(1, 100);
    lengthCalculation = 0;
    if (stateLanguage === true) text.innerText = dataFetch[databaseSelection][randomNumber].word;
    else text.innerText = dataFetch[databaseSelection][randomNumber].translation;
};

btnStartPush.onclick = function () {
    let liLast = document.createElement('li');
    if (stateLanguage === true) {
        if (valueInput.value === dataFetch[databaseSelection][randomNumber].translation) {
            replyPopup('rgba(0, 128, 0, 0.527)', 'Правельна відповідь'),
                numGood++,
                numberOfCorrectAnswers++,
                (countGood.innerText = numGood);
            countCombo.innerText =
                numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            localStorage.setItem('countCombo', `${countCombo.innerText}`);
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            saveNum(numGood, numBad);
            liLast.innerHTML = tegLiLast(
                dataFetch[databaseSelection][randomNumber].translation,
                dataFetch[databaseSelection][randomNumber].word,
                numBad + numGood,
                'good'
            );
            iconAddTeg.appendChild(liLast);
        } else {
            replyPopup(
                '#ff0000ba',
                `${valueInput.value} не правильна відповідь. Правильна відповідь: ${dataFetch[databaseSelection][randomNumber].translation}  `
            );

            numBad++, (countBad.innerText = numBad);
            numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            numberOfCorrectAnswers = 0;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            saveNum(numGood, numBad);

            liLast.innerHTML = tegLiLast(
                dataFetch[databaseSelection][randomNumber].translation,
                dataFetch[databaseSelection][randomNumber].word,
                numBad + numGood,
                'bad'
            );
            iconAddTeg.appendChild(liLast);
        }

        randomNumber = randomInteger(1, 100);
        text.innerText = dataFetch[databaseSelection][randomNumber].word;
    } else {
        if (valueInput.value === dataFetch[databaseSelection][randomNumber].word) {
            replyPopup('rgba(0, 128, 0, 0.527)', 'Правельна відповідь'),
                numGood++,
                numberOfCorrectAnswers++,
                (countGood.innerText = numGood);
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);
            saveNum(numGood, numBad);

            countCombo.innerText =
                numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;

            liLast.innerHTML = tegLiLast(
                dataFetch[databaseSelection][randomNumber].word,
                dataFetch[databaseSelection][randomNumber].translation,
                numBad + numGood,
                'good'
            );
            iconAddTeg.appendChild(liLast);
        } else {
            replyPopup(
                '#ff0000ba',
                `${valueInput.value} не правильна відповідь. Правильна відповідь: ${dataFetch[databaseSelection][randomNumber].word}  `
            );

            numBad++, (countBad.innerText = numBad);
            saveNum(numGood, numBad);

            numberOfCorrectAnswers > countCombo.innerText ? numberOfCorrectAnswers : countCombo.innerText;
            numberOfCorrectAnswers = 0;
            iconMeanValue.innerText = meanValueCalculator(numGood, numBad);

            liLast.innerHTML = tegLiLast(
                dataFetch[databaseSelection][randomNumber].word,
                dataFetch[databaseSelection][randomNumber].translation,
                numBad + numGood,
                'bad'
            );
            iconAddTeg.appendChild(liLast);
        }

        randomNumber = randomInteger(1, 100);
        text.innerText = dataFetch[databaseSelection][randomNumber].translation;
        resetHint();
    }
    historyIconHidden();
    btnStartPush.disabled = true;

    setTimeout(() => {
        response.style.opacity = '0';
        btnStartPush.disabled = false;
    }, 4500);

    valueInput.value = '';
};
iconActive.onclick = function () {
    visibilityIconMode = iconModeSwitch ? 'block' : 'none';
    iconMode.style.display = `${visibilityIconMode}`;
    iconModeSwitch = !iconModeSwitch;
};

h2Elements.forEach((element) => {
    element.onclick = function (event) {
        visibilityIconMode = iconModeSwitch ? 'block' : 'none';
        iconMode.style.display = `${visibilityIconMode}`;
        iconModeSwitch = !iconModeSwitch;
        const dataCountBaseSelection = element.getAttribute('count');
        databaseSelection = dataCountBaseSelection;
        replacementMode.innerText = iconText[dataCountBaseSelection];
        event.stopPropagation();
        resetHint();

        if (stateLanguage === true) text.innerText = dataFetch[databaseSelection][randomNumber].word;
        else text.innerText = dataFetch[databaseSelection][randomNumber].translation;
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
    } else if (!iconActive.contains(event.target) && iconModeSwitch === false) {
        iconMode.style.display = 'none';
        iconModeSwitch = true;
    }
};

timeSelectionAll.forEach((element, index) => {
    element.onclick = () => {
        deleteColorTime();
        element.classList.add('clock--color');
        clockTimeHidden();
        if (index > 0) {
            timer.innerText = arrayTimerSecond[index];
            timer.style.display = 'block';
        } else {
            timer.style.display = 'none';
        }
    };
});

function toggleHistoryIconVisibility() {
    visibilityIconHistory = iconHistorySwitch ? 'block' : 'none';
    historyIcon.style.display = visibilityIconHistory;
    iconHistorySwitch = !iconHistorySwitch;
}

const resetHint = () => {
    hintBottom.style.display = 'none';
    hintTop.style.display = 'none';
    lengthCalculation = 0;
};
