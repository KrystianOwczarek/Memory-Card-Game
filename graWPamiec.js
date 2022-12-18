    const EASY = document.querySelector('#easy');
    const NORMAL = document.querySelector('#normal');
    const HARD = document.querySelector('#hard');
    const MAIN_CONTAINER = document.querySelector('.mainContainer');
    const EASY_CONTAINER = document.querySelector('.easyContainer');
    const NORMAL_CONTAINER = document.querySelector('.normalContainer');
    const HARD_CONTAINER = document.querySelector('.hardContainer');
    const BACK_ARROW = document.querySelectorAll('.backArrow');
    const CARD = document.querySelectorAll('.card');
    const EASY_BOARD = document.querySelector('#easyBoard');
    const NORMAL_BOARD = document.querySelector('#normalBoard');
    const HARD_BOARD = document.querySelector('#hardBoard');
    const EASY_TURN_COUNTER = document.querySelector('#easyTurnCounter');
    const NORMAL_TURN_COUNTER = document.querySelector('#normalTurnCounter');
    const HARD_TURN_COUNTER = document.querySelector('#hardTurnCounter');
    const END_GAME = document.querySelector('.endGame');

    
    //tablica z obrazkami kart
    let easyCardArray = ['1.png', '4.png', '2.png', '6.png', '1.png', '3.png', '8.png', '3.png', '4.png', '2.png', '5.png', '5.png', '7.png', '8.png', '7.png', '6.png'];
    let normalCardArray = ['1.png', '4.png', '2.png', '6.png', '1.png', '3.png', '8.png', '3.png', '4.png', '2.png', '5.png', '5.png', '7.png', '8.png', '7.png', '6.png', '9.png', '9.png', '11.png', '12.png', '11.png', '10.png', '12.png', '10.png'];
    let hardCardArray = ['1.png', '4.png', '2.png', '6.png', '1.png', '3.png', '8.png', '3.png', '4.png', '2.png', '5.png', '5.png', '7.png', '8.png', '7.png', '6.png', '9.png', '9.png', '11.png', '12.png', '11.png', '10.png', '12.png', '10.png', '16.png', '16.png', '14.png', '15.png', '13.png', '15.png', '14.png', '13.png'];

    //puste tablice na wybrane karty dla każdego poziomu trudnośći
    let easyChoiceCard = [];
    let normalChoiceCard = [];
    let hardChoiceCard = [];
    //puste tablice na ID wybranej karty dla każdego poziomu trudnośći
    let easyChoiceCardId = [];
    let normalChoiceCardId = [];
    let hardChoiceCardId = [];
    //tablice przechowujące dopasowane pary kart dla każdego poziomu trudnośći
    let easyCardsWin = [];
    let normalCardsWin = [];
    let hardCardsWin = [];
    //zmienna zawierająca liczbę tur
    let easyTurnCounter = 0;
    let normalTurnCounter = 0;
    let hardTurnCounter = 0;
    //zmienna odpowiadająca za blokowanie się kart
    let lock = false;
    let endEasyGameArray = [] ;
    let endNormalGameArray = [];
    let endHardGameArray = [];

//funkcja odpowiadająca za wybór poziomu trudnośći
function selectDifficulty()
{
    EASY.addEventListener('click', () => {
        MAIN_CONTAINER.classList.toggle('visibility');
        EASY_CONTAINER.classList.toggle('visibility');
    })

    NORMAL.addEventListener('click', () => {;
        MAIN_CONTAINER.classList.toggle('visibility');
        NORMAL_CONTAINER.classList.toggle('visibility');
    })

    HARD.addEventListener('click', () => {
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

//losowanie łatwych kart
easyCardArray.sort(() => 0.5 - Math.random());

//funkcje odpowiadające za rozgrywke na łatwym poziomie 
function checkMathForEasyBoard()
{
    //zmienna, w której zapisujemy wszystkie zdjęcia znajdujące się na planszy
    let cards = document.querySelectorAll('img');
    const optionOneName = easyChoiceCard[0];
    //do stałej przypisujemy wartość data-id pierwszej naciśniętej przez nas karty (znajdującej się w tablicy)
    const optionOneId = easyChoiceCardId[0];
    //do stałej przypisujemy wartośc data-id drugiej naciśniętej przez nas karty (znajdującej się w tablicy)
    const optionTwoId = easyChoiceCardId[1];
    //jeśli nazwa pierwszej naciśniętej karty jest równa drugiej naciśnietej
    if(easyChoiceCard[0] === easyChoiceCard[1]){
        //to ustaw ukrywamy obie karty
        cards[optionOneId].style.visibility = 'hidden';
        cards[optionTwoId].style.visibility = 'hidden';
        //i dodajemy trafione karty do tablicy
        easyCardsWin.push(easyChoiceCard);
    //jeśli pierwsza nie pasuje do drugiej
    }else{
        //ustaw ich tła na początkowe
        cards[optionOneId].setAttribute('src', 'img/background.png');
        cards[optionTwoId].setAttribute('src', 'img/background.png');    
    }
    easyTurnCounter++;
    
    //po każdym odkryciu pary zwiększamy licznik o 1 
    //po każddym odkryciu pary aktualizujemy licznik
    EASY_TURN_COUNTER.innerHTML = `Turn counter: ${easyTurnCounter}`;
    //po każdym odkryciu pary czyścimy tablice z nazwami
    easyChoiceCard = [];
    //po każdym odkryciu pary czyścimy tablice z id kart
    easyChoiceCardId = [];
    //jeśli długość tablicy z trafionymi kartami jest równa 8 (czyli tyle ile jest par na łatwej planszy)
    if(easyCardsWin.length == 8){
        EASY_BOARD.setAttribute('data-end','true');
        let endEasyGame = EASY_BOARD.getAttribute('data-end');
        endEasyGameArray.push(endEasyGame);
        //zmień kolor napisu
        EASY_BOARD.style.color = '#fff';
        //powieksz kolor i planszę
        EASY_BOARD.style.width = '40em';
        EASY_BOARD.style.height = '40em';
        EASY_BOARD.style.fontSize = '1.5rem';
        //wyświetl napis z ifnormacją odnośnie ilośći tur, w których udało ci się wygrać
        EASY_BOARD.textContent = `You did it in ${easyTurnCounter} turns!`;
    }
    //odblokuj po sprawdzeniu kart znajdujących się w tablicy
    lock = false;
    endGame();
}

//funkcja pokazująca karty
function showEasyCard()
{
    if(lock == false){
        //zapisz w zmiennej data-id nacisnietej karty
        let easyCardId = this.getAttribute('data-id');
        //dodaj do tablicy nazwe klikniętej karty(w tym przypadku np. 1.png)
        easyChoiceCard.push(easyCardArray[easyCardId]);
        //dodaj do tablicy id kliknietej karty(data-id, czyli która z kolei to karta)
        easyChoiceCardId.push(easyCardId);
        //warunek sprawdzający czy karty dodane do tablicy sa takie same pod względem nazwy i id, jeśli tak to usuwa ostatni element tych tablic
        if(easyChoiceCard[0] === easyChoiceCard[1] && easyChoiceCardId[0] === easyChoiceCardId[1]){
            easyChoiceCard.pop();
            easyChoiceCardId.pop();
        }
        //zmień źródło zdjęcia naciśniętej karty na źródło zdjęcia odpowiadające kolejności w tablicy na podstawie elementu data-id 
        this.setAttribute('src', `img/${easyCardArray[easyCardId]}`);
        //jeśli długość tablicy wybranych kart jest równą pod względem typu i wartości
        if(easyChoiceCard.length === 2){
            //zablokuj karty gdy w tablicy są już dwie
            lock = true;
            //to wywołaj funkcję po połowie sekundy
            setTimeout(checkMathForEasyBoard, 500);
        }
    }
}

function startEasyBoard()
{
    //pętla dzięki, której tworzę 16 kart na łatwej planszy
    for(let i = 0; i < easyCardArray.length; i++){
        //tworzę element img i przypisuje go do zmiennej
        let card = document.createElement('img');
        //ustawiam źródło zdjęcia na tył karty 
        card.setAttribute('src','img/background.png');
        //ustawiam elementy data-id adekwatne do zmiennej w pętli 
        card.setAttribute('data-id', i);
        //po kliknięciu uruchom pokaż kartę
        card.addEventListener('click', showEasyCard);
        //dodaj klase card
        card.classList.toggle('card');
        //dodaj zdjęcia do planszy
        EASY_BOARD.appendChild(card);
        lock = false;
    }
}

//losowanie kart z normalnego poziomu trudności
normalCardArray.sort(() => 0.3 - Math.random());

//funkcje odpowiadające za rozgrywke na normalnym poziomie
function checkMathForNormalBoard()
{
    let cards2 = document.querySelectorAll('#normalCard');
    const normalOptioneOneId = normalChoiceCardId[0];
    const normalOptioneTwoId = normalChoiceCardId[1];
    if(normalChoiceCard[0] === normalChoiceCard[1]){
        cards2[normalOptioneOneId].style.visibility = 'hidden';
        cards2[normalOptioneTwoId].style.visibility = 'hidden';
        normalCardsWin.push(normalChoiceCard);
    }else{
        cards2[normalOptioneOneId].setAttribute('src', 'img/background.png');
        cards2[normalOptioneTwoId].setAttribute('src', 'img/background.png');
    }
    normalTurnCounter++;
    NORMAL_TURN_COUNTER.innerHTML = `Turn counter: ${normalTurnCounter}`;
    normalChoiceCard = [];
    normalChoiceCardId = [];
    if(normalCardsWin.length == 12)
    {
        NORMAL_BOARD.setAttribute('data-end','true');
        let endNormalGame = NORMAL_BOARD.getAttribute('data-end');
        endNormalGameArray.push(endNormalGame);
        NORMAL_BOARD.style.color = '#fff';
        NORMAL_BOARD.style.width = '40em';
        NORMAL_BOARD.style.height = '40em';
        NORMAL_BOARD.style.fontSize = '1.5rem';
        NORMAL_BOARD.textContent = `You did it in ${normalTurnCounter} turns`;
    }
    lock = false;
    endGame();
}

function showNormalCard()
{
    if(lock == false){
        let normalCardId = this.getAttribute('data-id');
        normalChoiceCard.push(normalCardArray[normalCardId]);
        normalChoiceCardId.push(normalCardId);
        if(normalChoiceCard[0] === normalChoiceCard[1] && normalChoiceCardId[0] === normalChoiceCardId[1]){
            normalChoiceCard.pop();
            normalChoiceCardId.pop();
        }
        this.setAttribute('src', `img/${normalCardArray[normalCardId]}`);
        if(normalChoiceCard.length === 2){
            lock = true;
            setTimeout(checkMathForNormalBoard, 500)
        }
    }
}

function startNormalBoard()
{
    for(let i = 0; i < normalCardArray.length; i++){
        let card = document.createElement('img');
        card.setAttribute('src', 'img/background.png');
        card.setAttribute('data-id', i);
        card.setAttribute('id', 'normalCard');
        card.addEventListener('click', showNormalCard);
        card.classList.toggle('card');
        NORMAL_BOARD.appendChild(card);
    }
}

//losowanie kart z trudnego poziomu trudności
hardCardArray.sort(() => 0.7 - Math.random());

//funkcje odpowiadające za rozgrywke na trudnym poziomie 
function checkMathForHardBoard()
{
    let hardCards = document.querySelectorAll('.hardCard');
    const hardOptionOneId = hardChoiceCardId[0];
    const hardOptionTwoId = hardChoiceCardId[1];
    if(hardChoiceCard[0] == hardChoiceCard[1]){
        hardCards[hardOptionOneId].style.visibility = 'hidden';
        hardCards[hardOptionTwoId].style.visibility = 'hidden';
        hardCardsWin.push(hardChoiceCard);
    }else{
        hardCards[hardOptionOneId].setAttribute('src', 'img/background.png');
        hardCards[hardOptionTwoId].setAttribute('src', 'img/background.png');
    }
    hardTurnCounter++;
    hardChoiceCard = [];
    hardChoiceCardId = [];
    HARD_TURN_COUNTER.innerHTML = `Turn counter: ${hardTurnCounter}`;
    if(hardCardsWin.length == 16){
        HARD_BOARD.setAttribute('data-end','true');
        let endHardGame = HARD_BOARD.getAttribute('data-end');
        endHardGameArray.push(endHardGame);
        HARD_BOARD.style.color = '#fff';
        HARD_BOARD.style.width = '40em';
        HARD_BOARD.style.height = '40em';
        HARD_BOARD.style.fontSize = '1.5rem';
        HARD_BOARD.textContent = `You did it in ${hardTurnCounter} turns`;
    }
    lock = false;
    endGame();
}

function showHardCard()
{
    if(lock == false){
        let hardCardId = this.getAttribute('data-id');
        hardChoiceCard.push(hardCardArray[hardCardId]);
        hardChoiceCardId.push(hardCardId);
        if(hardChoiceCard[0] === hardChoiceCard[1] && hardChoiceCardId[0] === hardChoiceCardId[1]){
            hardChoiceCard.pop();
            hardChoiceCardId.pop();
        }
        this.setAttribute('src', `img/${hardCardArray[hardCardId]}`);
        if(hardChoiceCard.length === 2){
            lock = true;
            setTimeout(checkMathForHardBoard, 500)
        }
    }
}

function startHardBoard()
{
    for(let i = 0; i < hardCardArray.length; i++)
    {
        let card = document.createElement('img');
        card.setAttribute('src','img/background.png');
        card.setAttribute('data-id', i);
        card.setAttribute('class', 'hardCard');
        card.addEventListener('click', showHardCard);
        card.classList.toggle('card');
        HARD_BOARD.appendChild(card);
    }
}

function endGame()
{
    //jeśli wszystkie poziomy trudności zostaną zakończone to wyświetl gratulacje
    let endAllGameArray = endEasyGameArray.concat(endNormalGameArray, endHardGameArray);
    if(endAllGameArray.length == 3){
        MAIN_CONTAINER.classList.toggle('noDisplay');
        EASY_CONTAINER.classList.toggle('noDisplay');
        NORMAL_CONTAINER.classList.toggle('noDisplay');  
        HARD_CONTAINER.classList.toggle('noDisplay');
        END_GAME.classList.toggle('visibility');
    }
}

function start()
{
    selectDifficulty();
    backArrow();
    startEasyBoard();
    startNormalBoard();
    startHardBoard();
}
window.onload = start;