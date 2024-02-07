const iconStartLoading = document.getElementById('iconStartLoading');
import { btnStart } from './main.js';

let dataFetch = [];
const savedDataFetch = JSON.parse(localStorage.getItem('dataFetch')) || [];
const urlFetch = [
    'https://6585c8f5022766bcb8c95bf4.mockapi.io/English',
    'https://6585c8f5022766bcb8c95bf4.mockapi.io/Travel',
    'https://6585c8f5022766bcb8c95bf4.mockapi.io/Familiarity',
    'https://6585c8f5022766bcb8c95bf4.mockapi.io/Family',
    'https://6585c8f5022766bcb8c95bf4.mockapi.io/Shop',
    'https://6585c8f5022766bcb8c95bf4.mockapi.io/DescriptionOfAppearance',
];
const fetchData = async () => {
    let a = 0;
    let b = urlFetch.length;

    if (savedDataFetch.length !== 6) {
        while (a < b) {
            try {
                const response = await fetch(urlFetch[a], {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                dataFetch.push(data);
            } catch (error) {
                console.error(error.message);
            }
            a++;
        }

        localStorage.setItem('dataFetch', JSON.stringify(dataFetch));
        btnStart.disabled = false;
    } else {
        dataFetch = [...savedDataFetch, ...dataFetch];
        setTimeout(() => {
            btnStart.disabled = false;
        }, 1000);
    }
    iconStartLoading.style.display = 'none';
};

fetchData();

export { dataFetch };
