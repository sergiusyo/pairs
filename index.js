//создаем контейнер
const $game = document.getElementById('game');
let firstCard = null,
    secondCard = null

export default class Card {
    _open = false
    _success = false


    constructor(container, number, action) {
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.card.textContent = number;
        this.number = number;
        //вешаем обработчик клика по карточке
        this.card.addEventListener('click', () => {
            if (this.open == false && this.success == false) {
                this.open = true
                action(this)
            }
        })

        container.append(this.card)

    }



    set open(value) {
        this._open = value
        value ? this.card.classList.add('open') : this.card.classList.remove('open');
    }

    get open() {
        return this._open
    }

    set success(value) {
        this._success = value
        value ? this.card.classList.add('success') : this.card.classList.remove('success');
    }

    get success() {
        return this._success
    }

}

//проверка карточек
function flip(card) {
    //проверка на совпадение!
    if (firstCard !== null && secondCard !== null) {
        if (firstCard.number != secondCard.number) {
            firstCard.open = false
            secondCard.open = false
            firstCard = null
            secondCard = null
        }
    }


    if (firstCard == null) {
        firstCard = card
    } else {
        secondCard = card;
    }


    //проверка на НЕсовпадение!
    if (firstCard !== null && secondCard !== null) {
        if (firstCard.number == secondCard.number) {
            firstCard.success = true
            secondCard.success = true
            firstCard = null
            secondCard = null
        }
    }

    if (document.querySelectorAll('.card').length == document.querySelectorAll('.success').length) {
        setTimeout(function () {
            alert('Все карточки открыты!');
            window.location.reload();
        }, 300)
    }
}


//функция генерации массива парных чисел
function pairNumbersArray(count) {
    let array = [];

    for (let i = 1; i <= count / 2; i++) {
        array.push(i, i)

    }
    return array

}

//функция перемешивания массива (метод Фишера-Йетса). Используем стрелочную функцию
let ListArray = pairNumbersArray(8);
const shuffle = (pairNumbersArray) => {

    let m = pairNumbersArray.length, t, i;

    // Пока есть элементы для перемешивания
    while (m) {

        // Берем оставшийся элемент и приводим к целому случайному числу
        i = Math.floor(Math.random() * m--);

        // И меняем его местами с текущим элементом
        t = pairNumbersArray[m];
        pairNumbersArray[m] = pairNumbersArray[i];
        pairNumbersArray[i] = t;
    }

    return ListArray;

}

console.log(shuffle(ListArray));


//создаем карточки
let shuffleArray = shuffle(ListArray);

function createCards(arrayCards) {
    for (const item of arrayCards) {
        new Card($game, item, flip)
    }
}

createCards(shuffleArray);


//создание игры, логика приложения
let count = 8;
function gameApp(container, count) {
    let array = []
    function pairNumbersArray(count) {
        let array = [];
        for (let i = 1; i <= count / 2; i++) {
            array.push(i, i)
            array.push(i, i)
        }
        return array
    }
    //кнопка Рестарт!
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Рестарт!'

    restartBtn.classList.add('btn-restart');
    $game.append(restartBtn);
    restartBtn.addEventListener('click', () => {
        document.getElementById('game').innerHTML = ''
        createCards(shuffleArray);
        gameApp(document.getElementById('game'))
    })



    //таймер обратного отсчета
    let time = 60;

    function sec(numb, intID) {
        let _ = numb;
        if (_ <= 0) {
            clearInterval(intID);
        }
        return (_ < 10) ? '0' + _ : _;
        if (_ <= 0) {
            clearInterval(intID);
        }

    }

    function interval(intID, numb) {
        let span = document.getElementById(intID);
        intID = setInterval(function () {
            span.innerHTML = sec(numb--, intID);
            
            
            //завершение игры по истечении таймера
            if(span.innerHTML == 0) {
                alert('Игра закончена, начать заново!')             
                document.querySelectorAll('.card').forEach(card => {              
                    card.remove()                                              
                    window.location.reload();
                })
            }
        }, 1000)
    }
    interval('sec', time);
}
gameApp(document.getElementById('game'), count)
