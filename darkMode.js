// darkMode 

const clickDarkMode = document.querySelectorAll('.clickDarkMode');

clickDarkMode.forEach((item, i) => {
    item.addEventListener('click', event => {
        const element = document.body;

        const theme = event.target.dataset.name === 'dark' ? 'dark' : 'light';
        element.dataset.bsTheme = theme;

        localStorage.setItem('darkMode', theme);

        const storeDarkMode = {
            activeitem: i
        };

        localStorage.setItem('activeItem', JSON.stringify(storeDarkMode));

        clickDarkMode.forEach(item => item.classList.remove('active'));
        item.classList.add('active');

        const Thismode = document.querySelectorAll('.Thismode');
        Thismode.forEach(item => item.classList.remove('active'));
        Thismode[i].classList.add('active');

        console.log(storeDarkMode)

    });
});

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

});