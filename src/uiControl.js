import {
    numBad,
    numGood,
    timeSelectionAll,
    btnStartPush,
    btnStartupTimer,
    hintWord,
    controlLanguage,
    topic,
    historyButton,
    ukraine,
    english,
    iconTopic,
} from './main.js';

export const historyIconWithoutData = document.querySelector('.history__icon__withoutData');
export const historyIconData = document.querySelector('.history__icon__data');
export const myInput = document.getElementById('myInput');
export const clockTime = document.getElementById('clockTime');
const containerMain = document.querySelector('.container__main');
export const iconText = ['Випадкові', 'Подорожі', 'Знайомство', `Сім'я`, 'Магазин', 'Зовнішності'];
export const arrayTimerSecond = ['0', '30', '60', '90'];
export const historyIcon = document.getElementById('historyIcon');
const timeSelection = document.getElementById('timeSelection');
let visibilityIconHistory;
export let iconHistorySwitch = true;
export let stateClock = false;
export let iconTopicSwitch = true;
export let visibilityIconMode;

const iconModeHidden = () => {
    visibilityIconMode = iconTopicSwitch ? 'block' : 'none';
    iconTopic.style.display = `${visibilityIconMode}`;
    iconTopicSwitch = !iconTopicSwitch;
};

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

const deleteColorTime = () => {
    timeSelectionAll.forEach((element) => {
        element.classList.remove('clock--color');
    });
};

const hiddenPointerEvents = () => {
    clockTime.style.pointerEvents = 'auto';
    controlLanguage.style.pointerEvents = 'auto';
    topic.style.pointerEvents = 'auto';
    historyButton.disabled = false;
    ukraine.style.color = 'black';
    english.style.color = 'black';
};

function toggleHistoryIconVisibility() {
    visibilityIconHistory = iconHistorySwitch ? 'block' : 'none';
    historyIcon.style.display = visibilityIconHistory;
    iconHistorySwitch = !iconHistorySwitch;
}

const switchMain = (status) => {
    containerMain.style.display = `${status === 'block' ? 'flex' : 'none'}`;
    btnStartPush.style.display = status;
    myInput.style.display = status;
    hintWord.style.pointerEvents = `${status === 'block' ? 'auto' : 'none'}`;
    if (status === 'none') btnStartupTimer.style.display = 'block';
    else btnStartupTimer.style.display = 'none';
};

const clockTimeHidden = () => {
    let hiddenClock = stateClock ? 'flex' : 'none';
    timeSelection.style.display = `${hiddenClock}`;
    stateClock = !stateClock;
};

const tegLiLast = function (value_1, value_2, nomination, name) {
    const tegLi = `
    <img width="18px" style="margin-left: 14px" src="img/${name}.png" alt="" />
    <b id="icon_nomination">${nomination}.</b><span>${myInput.value}</span>
    <img width="20px" src="img/icon-right-arrow.png" alt="" />
    <span>${value_1}</span>
    <img width="20px" src="img/icon-equal-mathematical-sign.png" alt="" />
    <span >${value_2}</span>`;
    localStorage.setItem(`'${nomination}'`, tegLi);
    return tegLi;
};

const saveNum = (numGood, numBad) => {
    localStorage.setItem('numGood', numGood);
    localStorage.setItem('numBad', numBad);
};

const meanValueCalculator = (countReplyGood, countReplyBad, icon) => {
    if (icon === 'history') {
        const sumTask = countReplyBad + countReplyGood;
        const meanValue = ((countReplyGood / sumTask) * 100).toFixed(1);
        localStorage.setItem('meanValue', meanValue);
        return meanValue;
    } else {
        const sumTask = countReplyBad + countReplyGood;
        const meanValue = ((countReplyGood / sumTask) * 100).toFixed(1);
        return meanValue >= 0 ? meanValue : 0;
    }
};

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function replyPopup(color, text) {
    response.style.opacity = '1';
    response.style.background = `${color}`;
    response.innerText = `${text}`;
}

export {
    historyIconHidden,
    tegLiLast,
    saveNum,
    meanValueCalculator,
    randomInteger,
    replyPopup,
    deleteColorTime,
    clockTimeHidden,
    switchMain,
    hiddenPointerEvents,
    toggleHistoryIconVisibility,
    iconModeHidden,
};
