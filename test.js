const containertest = document.querySelectorAll('.containertest');

containertest.forEach(item => {
    const img = item.querySelector('img').src;
    const title = item.querySelector('.title').textContent;
    const price = item.querySelector('.price').textContent;
    const addToCart = item.querySelector('.addToCart');

    addToCart.addEventListener('click', () => {
        const getItem = JSON.parse(localStorage.getItem('getItem')) || [];

        let existItem = getItem.findIndex(item => item.title === title);
        if (existItem !== -1) {

            getItem[existItem].quantity += 1;

            localStorage.setItem('getItem', JSON.stringify(getItem));

            console.log(localStorage.getItem('getItem'))

            return;
        }

        const dataItem = {
            img: img,
            title: title,
            price: price,
            quantity: 1
        }

        getItem.push(dataItem);

        localStorage.setItem('getItem', JSON.stringify(getItem));

        console.log(localStorage.getItem('getItem'))

    })


})

const darkMode = localStorage.getItem('darkMode') || [];
document.body.dataset.bsTheme = darkMode;

