// updateprice 

const updatePrice2 = () => {
    let total = 0;
    const totalCotnainer = document.querySelector('.total');
    const cartItem2 = document.querySelectorAll('.cartItem2');

    cartItem2.forEach(item => {
        const quantity = item.querySelector('.quantity').textContent;
        const priceCreate = item.querySelector('.priceCreate').textContent.replace('$', '');

        total += priceCreate * quantity;
    })

    totalCotnainer.textContent = `$${total.toFixed(2)}`;
}

// transform data to checkOut HTML file
const newData = JSON.parse(localStorage.getItem('newData')) || [];
const containerInner = document.querySelector('.containerInner');
newData.forEach(item => {
    const cartItem = document.createElement('tr');
    cartItem.classList.add('cartItem2');
    cartItem.innerHTML += `
    <td class="containerImg">
                    <img src="${item.img}" alt="" width="50px" height="50px" class="rounded-pill">
                </td>
                <td class="containerContentCreate mt-4 text-center">
                    <h6 class="titleCreate">${item.title}</h6>
                    <h6 class="priceCreate">${item.price}</h6>
                </td>
                <td class="quantity">${item.quantity}</td>
    `
    containerInner.appendChild(cartItem);

    updatePrice2();
})

newData.length > 0 ? document.querySelector('.containerNoItem').style.display = 'none' : document.querySelector('.containerNoItem').style.display = 'block';



const qrCode = document.querySelector('.qrCode');
const btnChange = document.querySelector('.btnChange');

let listQr = ['khmerQr.jpg', 'dollarQr.jpg'];
let count = 0;

btnChange.addEventListener('click', () => {
    count++;

    if (count >= listQr.length) {
        count = 0;
    }

    loading.classList.remove('hidden');

    setTimeout(() => {
        loading.classList.add('hidden');
        qrCode.src = listQr[count];
    }, 4000)
})

const payMent = document.querySelector('.payMent');
const loading = document.querySelector('.loading');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const containerQr = document.querySelector('.containerQr');
payMent.addEventListener('click', () => {
    if (newData.length === 0) {

        alert('Please add item to cart first!')

        return;
    }

    loading.classList.remove('hidden');
    body.classList.add('active');

    setTimeout(() => {
        loading.classList.add('hidden');
        containerQr.classList.add('active');
        overlay.classList.add('active');
    }, 4000)


    overlay.addEventListener('click', () => {
        body.classList.remove('active');
        overlay.classList.remove('active');
        containerQr.classList.remove('active');
    })


})
