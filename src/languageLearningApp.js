import { numBad, numGood, timeSelectionAll, btnStartPush, btnStartupTimer, hintWord } from './main.js';
export const historyIconWithoutData = document.querySelector('.history__icon__withoutData');
export const historyIconData = document.querySelector('.history__icon__data');
export const myInput = document.getElementById('myInput');
export const clockTime = document.getElementById('clockTime');
const containerMain = document.querySelector('.container__main');
export const iconText = ['Випадкові', 'Подорожі', 'Знайомство', `Сім'я`, 'Магазин', 'Зовнішності'];
export const arrayTimerSecond = ['0', '30', '60', '90'];
const timeSelection = document.getElementById('timeSelection');
let stateClock = false;
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
    <img width="18px" style="margin-left: 14px" src="/img/${name}.png" alt="" />
    <b id="icon_nomination">${nomination}.</b><span>${myInput.value}</span>
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
    const meanValue = ((countReplyGood / sumTask) * 100).toFixed(1);
    localStorage.setItem('meanValue', meanValue);
    return meanValue;
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
};
