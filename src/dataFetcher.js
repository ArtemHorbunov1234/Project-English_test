let value;
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
        value = data;
    })
    .catch((error) => {
        console.error(error);
    });

export { value };
