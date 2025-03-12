const btnSee = document.querySelectorAll('.btnSee');

btnSee.forEach(item => {
    item.addEventListener('click', event => {
        const containerChange = document.querySelectorAll('.containerChange');

        containerChange.forEach(item => {
            if (event.target.dataset.name === 'seeall') {
                item.style.display = 'block';
            } else if (event.target.dataset.name === item.dataset.name) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        })

        btnSee.forEach(item => item.classList.remove('active'))
        item.classList.add('active');
    })
})

const input = document.getElementById('input');

input.addEventListener('keyup', () => {
    const input = document.getElementById('input').value.toLowerCase();
    const containerChange = document.querySelectorAll('.containerChange');

    containerChange.forEach(item => {
        const title = item.querySelector('.title').textContent.toLocaleLowerCase();

        if (title.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
})


const cartBox = document.querySelector('.cartbox');
window.addEventListener('load', () => {
    const element = localStorage.getItem('darkMode');
    document.body.dataset.bsTheme = element;

    const storeDarkMode = JSON.parse(localStorage.getItem('activeItem'));

    clickDarkMode.forEach((item, i) => {
        i === storeDarkMode.activeitem ? item.classList.add('active') : item.classList.remove('active');
    })

    const Thismode = document.querySelectorAll('.Thismode');
    Thismode.forEach((item, i) => {
        i === storeDarkMode.activeitem ? item.classList.add('active') : item.classList.remove('active');
    })


    const storeData = JSON.parse(localStorage.getItem('storage')) || [];
    console.log(localStorage.getItem('storage'));

    storeData.forEach(item => {

        const cartItem = document.createElement('div');
        cartItem.classList.add('cartItem', 'd-flex', 'justify-content-between', 'align-items-center', 'py-4');

        cartItem.innerHTML = `
        <div class="containerImg">
                    <img src="${item.img}" alt="" width="70px" height="70px" class="rounded-pill">
                </div>

                <div class="containerContentCreate mt-4 text-center">
                    <h6 class="titleCreate">${item.title}</h6>
                    <h6 class="priceCreate">${item.price}</h6>
                    <div class="containerCount">
                    <button class="btn btn-primary" id="decrease">-</button>
                    <button class="btn btn-outline-primary number">${item.quantity}</button>
                    <button class="btn btn-primary" id="increase">+</button>
                </div>
                </div>

                <i class="bi bi-trash-fill remove"></i>
        `

        cartBox.appendChild(cartItem);

        cartItem.querySelector('.remove').addEventListener('click', () => {
            cartItem.remove();

            const title = cartItem.querySelector('.titleCreate');
            let storeData = JSON.parse(localStorage.getItem('storage')) || [];

            storeData = storeData.filter(item => item.title !== title.textContent);
            localStorage.setItem('storage', JSON.stringify(storeData));

            updatePrice();
            countUpdate();
        })

        cartItem.querySelector('.containerCount').addEventListener('click', event => {
            const number = cartItem.querySelector('.number');
            let count = number.textContent;

            if (event.target.id === 'decrease' && count > 1) {
                count--;
            } else if (event.target.id === 'increase') {
                count++;
            };

            number.textContent = count;

            updatePrice();

            const title = cartItem.querySelector('.titleCreate');

            let storeData = JSON.parse(localStorage.getItem('storage')) || [];
            let existItem = storeData.findIndex(item => item.title === title.textContent);

            if (existItem !== -1) {
                storeData[existItem].quantity = count;

                localStorage.setItem('storage', JSON.stringify(storeData));
            }

        })


        updatePrice();
        countUpdate();
    })


});

// add item to cart
const containerChange = document.querySelectorAll('.containerChange');

containerChange.forEach(item => {
    const addToCart = item.querySelector('.addToCart');
    const img = item.querySelector('img').src;
    const title = item.querySelector('.title').textContent;
    const price = item.querySelector('.price').textContent;

    addToCart.addEventListener('click', () => {

        const cartItem = document.createElement('div');
        cartItem.classList.add('cartItem', 'd-flex', 'justify-content-between', 'align-items-center', 'py-4');

        const storeData = JSON.parse(localStorage.getItem('storage')) || [];

        let existItem = storeData.findIndex(item => item.title === title);
        if (existItem !== -1) {

            alert('This item aleady has in cart 1! so i just increase the quantity!');

            storeData[existItem].quantity += 1;

            localStorage.setItem('storage', JSON.stringify(storeData));

            const containerContentCreate = document.querySelectorAll('.containerContentCreate');
            const itemExist = containerContentCreate[existItem];
            itemExist.querySelector('.number').textContent = storeData[existItem].quantity;

            updatePrice();

            return;
        }

        cartItem.innerHTML = `
    <div class="containerImg">
                    <img src="${img}" alt="" width="70px" height="70px" class="rounded-pill">
                </div>

                <div class="containerContentCreate mt-4 text-center">
                    <h6 class="titleCreate">${title}</h6>
                    <h6 class="priceCreate">${price}</h6>
                    <div class="containerCount">
                    <button class="btn btn-primary" id="decrease">-</button>
                    <button class="btn btn-outline-primary number">1</button>
                    <button class="btn btn-primary" id="increase">+</button>
                </div>
                </div>

                <i class="bi bi-trash-fill remove"></i>
    `

        const storage = {
            img: img,
            title: title,
            price: price,
            quantity: 1
        };

        storeData.push(storage);

        localStorage.setItem('storage', JSON.stringify(storeData));

        cartBox.appendChild(cartItem);

        cartItem.querySelector('.remove').addEventListener('click', () => {
            cartItem.remove();
            const title = cartItem.querySelector('.titleCreate')

            let storeData = JSON.parse(localStorage.getItem('storage')) || [];

            storeData = storeData.filter(item => item.title !== title.textContent);
            localStorage.setItem('storage', JSON.stringify(storeData));

            countUpdate();
            updatePrice();
        })

        cartItem.querySelector('.containerCount').addEventListener('click', event => {
            const number = cartItem.querySelector('.number');
            let count = number.textContent;

            if (event.target.id === 'decrease' && count > 1) {
                count--;
            } else if (event.target.id === 'increase') {
                count++;
            };
            number.textContent = count;

            const storeData = JSON.parse(localStorage.getItem('storage')) || [];
            let existItem = storeData.findIndex(item => item.title === title);

            if (existItem !== -1) {
                storeData[existItem].quantity = count;

                localStorage.setItem('storage', JSON.stringify(storeData));
            }

            updatePrice();
        })

        countUpdate();
        updatePrice();
    })
})


// updateCount 

const countUpdate = () => {
    const countShopping = document.querySelector('.countShopping');
    const cartItem = document.querySelectorAll('.cartItem');
    const containerNoItem = document.querySelector('.containerNoItem');

    countShopping.textContent = cartItem.length;

    cartItem.length > 0 ? countShopping.style.color = 'red' : countShopping.style.color = 'black';
    cartItem.length > 0 ? containerNoItem.style.display = 'none' : containerNoItem.style.display = 'block';

}

// priceUpdate

const updatePrice = () => {
    const cartItem = document.querySelectorAll('.cartItem');
    const totalContainer = document.querySelector('.total');
    let total = 0;

    cartItem.forEach(item => {
        const number = item.querySelector('.number').textContent;
        const price = item.querySelector('.priceCreate').textContent.replace("$", '');

        total += price * number;
    })
    totalContainer.textContent = `$${total.toFixed(2)}`;
}


const checkOut = document.querySelector('.checkOut');

checkOut.addEventListener('click', () => {
    const storeData = JSON.parse(localStorage.getItem('storage')) || [];

    storeData.forEach(item => {
        const newData = JSON.parse(localStorage.getItem('newData')) || [];

        let existItem = newData.findIndex(dataNew => dataNew.title === item.title);
        if (existItem !== -1) {

            newData[existItem].quantity += item.quantity;

            localStorage.setItem('newData', JSON.stringify(newData));


            return;
        }

        const dataNew = {
            img: item.img,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
        }

        newData.push(dataNew);

        localStorage.setItem('newData', JSON.stringify(newData));

        console.log(newData)

    })
    const newData = JSON.parse(localStorage.getItem('newData')) || [];
    console.log(newData)

    document.querySelectorAll('.cartItem').forEach(item => item.remove());
    updatePrice();
    countUpdate();

    localStorage.removeItem('storage');

})


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

    })


})

const newData = JSON.parse(localStorage.getItem('newData')) || [];

newData.length > 0 ? document.querySelector('.hasitem').style.display = 'inline-flex' : document.querySelector('.hasitem').style.display = 'none';

