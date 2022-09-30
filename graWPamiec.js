    const EASY = document.querySelector('#easy');
    const NORMAL = document.querySelector('#normal');
    const HARD = document.querySelector('#hard');
    const MAIN_CONTAINER = document.querySelector('.mainContainer');
    const EASY_CONTAINER = document.querySelector('.easyContainer');
    const NORMAL_CONTAINER = document.querySelector('.normalContainer');
    const HARD_CONTAINER = document.querySelector('.hardContainer');
    const BACK_ARROW = document.querySelectorAll('.backArrow');
    const CARD = document.querySelectorAll('.card');

    let cardId = CARD.forEach(n => n.getAttribute('data-id'));

function selectDifficulty()
{
    EASY.addEventListener('click', () => {
        //alert('EASY');
        MAIN_CONTAINER.classList.toggle('visibility');
        EASY_CONTAINER.classList.toggle('visibility');

    })

    NORMAL.addEventListener('click', () => {
        //alert('NORMAL');
        MAIN_CONTAINER.classList.toggle('visibility');
        NORMAL_CONTAINER.classList.toggle('visibility');
    })

    HARD.addEventListener('click', () => {
        //alert('HARD');
        MAIN_CONTAINER.classList.toggle('visibility');
        HARD_CONTAINER.classList.toggle('visibility');
    })
}

function backArrow()
{
    BACK_ARROW.forEach(n => n.addEventListener('click', () => {
        MAIN_CONTAINER.classList.remove('visibility');
        EASY_CONTAINER.classList.remove('visibility');
        NORMAL_CONTAINER.classList.remove('visibility');
        HARD_CONTAINER.classList.remove('visibility');
    }))
}

function showCard()
{
    CARD.forEach(n => n.addEventListener('click', () => {
        alert(cardId);
    }))
}

function start()
{
    showCard();
    backArrow();
    selectDifficulty();
}
window.onload = start;