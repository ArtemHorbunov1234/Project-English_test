import { historyIconData, historyIconHidden, myInput, iconText, replyPopup, clockTime } from './languageLearningApp.js';
import { dataFetch } from './dataFetcher.js';
import {
    historyIconWithoutData,
    tegLiLast,
    saveNum,
    meanValueCalculator,
    randomInteger,
    arrayTimerSecond,
    switchMain,
    deleteColorTime,
    clockTimeHidden,
} from './languageLearningApp.js';
export const btnStartPush = document.getElementById('containerBtn');
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
const topicReplacement = document.getElementById('topicReplacement');
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
export const hintWord = document.getElementById('hintWord');
const hintBottom = document.getElementById('hintBottom');
const hintTop = document.getElementById('hintTop');
export const timeSelectionAll = document.querySelectorAll('#timeSelection b');
const timer = document.getElementById('timer');
export const btnStartupTimer = document.getElementById('btnStartupTimer');
const containerTimer = document.querySelector('.container__timer');
const resetTimer = document.querySelectorAll('.container__resetTimer');
const iconStatsTimerAnswer = document.getElementById('iconStatsTimerAnswer');
const iconTimerImg = document.getElementById('iconTimerImg');

let databaseSelection = 0;
let stateLanguage = false;
let randomNumber;
let iconTopicSwitch = true;
let iconHistorySwitch = true;
let visibilityIconMode;
let visibilityIconHistory;
let numberOfCorrectAnswers = 0;
let stateIconWidgets = false;
let lengthCalculation = 0;
let timerCount;
let timerIndex;
let timerInterval;

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
        myInput.placeholder = 'писати англійською';
    } else {
        ukraine.classList.add('border');
        text.innerText = dataFetch[databaseSelection][randomNumber].word;
        myInput.placeholder = 'писати українською';
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
        if (myInput.value === dataFetch[databaseSelection][randomNumber].translation) {
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
                `${myInput.value} не правильна відповідь. Правильна відповідь: ${dataFetch[databaseSelection][randomNumber].translation}  `
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
        if (myInput.value === dataFetch[databaseSelection][randomNumber].word) {
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
                `${myInput.value} не правильна відповідь. Правильна відповідь: ${dataFetch[databaseSelection][randomNumber].word}  `
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

    myInput.value = '';
};
iconActive.onclick = function () {
    visibilityIconMode = iconTopicSwitch ? 'block' : 'none';
    iconMode.style.display = `${visibilityIconMode}`;
    iconTopicSwitch = !iconTopicSwitch;
};

h2Elements.forEach((element) => {
    element.onclick = function (event) {
        visibilityIconMode = iconTopicSwitch ? 'block' : 'none';
        iconMode.style.display = `${visibilityIconMode}`;
        iconTopicSwitch = !iconTopicSwitch;
        const dataCountBaseSelection = element.getAttribute('count');
        databaseSelection = dataCountBaseSelection;
        topicReplacement.innerText = iconText[dataCountBaseSelection];
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
    } else if (!iconActive.contains(event.target) && iconTopicSwitch === false) {
        iconMode.style.display = 'none';
        iconTopicSwitch = true;
    }
};

timeSelectionAll.forEach((element, index) => {
    element.onclick = () => {
        deleteColorTime();
        element.classList.add('clock--color');
        clockTimeHidden();
        if (index > 0) {
            timer.innerText = arrayTimerSecond[index];
            containerTimer.style.display = 'flex';
            timerCount = arrayTimerSecond[index];
            timerIndex = index;
            switchMain('none');
            resetHint();
        } else {
            containerTimer.style.display = 'none';
            switchMain('block');
            ukraine.style.color = 'black';
            english.style.color = 'black';
        }
    };
});

function toggleHistoryIconVisibility() {
    visibilityIconHistory = iconHistorySwitch ? 'block' : 'none';
    historyIcon.style.display = visibilityIconHistory;
    iconHistorySwitch = !iconHistorySwitch;
}

function updateTimer() {
    timerCount--;
    timer.innerText = timerCount;
    if (timerCount <= 0) {
        stopTimer();
        clockTime.style.pointerEvents = 'auto';
        iconStatsTimerAnswer.style.display = 'flex';
        hintWord.style.pointerEvents = 'none';
        iconTimerImg.style.pointerEvents = 'none';
    }
}
btnStartupTimer.onclick = () => {
    timerInterval = setInterval(updateTimer, 100);
    clockTime.style.pointerEvents = 'none';
    switchMain('block');
    controlLanguage.style.pointerEvents = 'none';
    if (stateLanguage === false) {
        ukraine.style.color = '#0000006b';
    } else {
        english.style.color = '#0000006b';
    }
};

resetTimer.forEach((btn, index) => {
    btn.onclick = () => {
        stopTimer();
        switchMain('none');
        resetHint();
        clockTime.style.pointerEvents = 'auto';
        controlLanguage.style.pointerEvents = 'auto';
        ukraine.style.color = 'black';
        english.style.color = 'black';
        if (index !== 0) {
            iconStatsTimerAnswer.style.display = 'none';
            hintWord.style.pointerEvents = 'auto';
        }
    };
});

function stopTimer() {
    clearInterval(timerInterval);
    setTimeout(() => {
        timer.innerText = arrayTimerSecond[timerIndex];
        timerCount = arrayTimerSecond[timerIndex];
    }, 900);
}

const resetHint = () => {
    hintBottom.style.display = 'none';
    hintTop.style.display = 'none';
    lengthCalculation = 0;
};
