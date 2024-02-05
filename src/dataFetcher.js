const iconStartLoading = document.getElementById('iconStartLoading');
import { btnStart } from './main.js';
const dataFetch = [];
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
    while (a < b) {
        try {
            const response = await fetch(urlFetch[a], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            dataFetch.push(data);
            console.log(dataFetch);
        } catch (error) {
            console.error(error.message);
        }
        a++;
    }
    iconStartLoading.style.display = 'none';
    btnStart.disabled = false;
};

fetchData();

export { dataFetch };
