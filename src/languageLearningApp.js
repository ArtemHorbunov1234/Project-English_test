export const historyIconWithoutData = document.querySelector('.history__icon__withoutData');
export const historyIconData = document.querySelector('.history__icon__data');
export const valueInput = document.getElementById('myInput');
import { numBad } from './main.js';
import { numGood } from './main.js';
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

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { historyIconHidden, tegLiLast, saveNum, meanValueCalculator, randomInteger };
