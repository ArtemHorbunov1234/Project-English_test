let dataEnglish;
let dataTravel;
let dataFamiliarity;
let dataDescriptionOfAppearance;

fetch('https://6585c8f5022766bcb8c95bf4.mockapi.io/English', {
    method: 'Get',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        dataEnglish = data;
    })
    .catch((error) => {
        console.error(error);
    });

fetch('https://6585c8f5022766bcb8c95bf4.mockapi.io/Travel', {
    method: 'Get',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        dataTravel = data;
    })
    .catch((error) => {
        console.error(error);
    });

fetch('https://6585c8f5022766bcb8c95bf4.mockapi.io/Familiarity', {
    method: 'Get',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        dataFamiliarity = data;
    })
    .catch((error) => {
        console.error(error);
    });

fetch('https://6585c8f5022766bcb8c95bf4.mockapi.io/DescriptionOfAppearance', {
    method: 'Get',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        dataDescriptionOfAppearance = data;
    })
    .catch((error) => {
        console.error(error);
    });

export { dataEnglish, dataTravel, dataFamiliarity, dataDescriptionOfAppearance };
