class Card {
  _open = false
  _success = false

  constructor(container, number, action) {
    this.card = document.createElement('div')
    this.card.classList.add('card')
    this.card.textContent = number

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

let newCard = new Card(document.getElementById('game'), 1, flip);
let newCard2 = new Card(document.getElementById('game'), 2, flip);
let newCard3 = new Card(document.getElementById('game'), 3, flip);
let newCard4 = new Card(document.getElementById('game'), 4, flip);
let newCard5 = new Card(document.getElementById('game'), 5, flip);
let newCard6 = new Card(document.getElementById('game'), 6, flip);
let newCard7 = new Card(document.getElementById('game'), 7, flip);
let newCard8 = new Card(document.getElementById('game'), 8, flip);

function flip(card) {
  console.log(card);
}


//функция генерации массива парных чисел
function pairsNumberArray() {
  let array = [];
  let minLength = 1;
  let maxLength = 8;
  let count = 16;

  for (let i = 0; i < count; i++) {
    array.push(Math.round(Math.random() * (maxLength - minLength) + minLength));
  }
  console.log(array);
}
pairsNumberArray();



//функция перемешивания массива (метод Фишера-Йетса). Испольую стрелочную функцию
let ListArray = [1, 2, 3, 4, 5, 6, 7, 8];
const shuffle = (pairsNumberArray) => {

  let m = pairsNumberArray.length, t, i;

  // Пока есть элементы для перемешивания
  while (m) {

    // Берем оставшийся элемент и приводим к целому случайному числу
    i = Math.floor(Math.random() * m--);

    // И меняем его местами с текущим элементом
    t = pairsNumberArray[m];
    pairsNumberArray[m] = pairsNumberArray[i];
    pairsNumberArray[i] = t;
  }

  return ListArray;

}

console.log(shuffle(ListArray)); 