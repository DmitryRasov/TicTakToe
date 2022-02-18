const selectBox =document.querySelector('.select-box'),
selectXBtn = selectBox.querySelector('.playerX'),
selectOBtn = selectBox.querySelector('.playerO'),
playBoard = document.querySelector('.play-board'),
allBox = document.querySelectorAll('section span'),
players = document.querySelector('.players');

window.onload = () => { // запустить процессы к загрузке страницы / once window.object is loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick listener in every possible span of the sections / в добавление onclick в каждом доступном спане в section
        allBox[i].setAttribute('onclick', 'clickedBox(this)')
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add('hide');  // выбор исчезает / makes selection hidden as players is choosen
        playBoard.classList.add('show');  // появляется игровое поле / appear of the playboard
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add('hide');  //same but for second player
        playBoard.classList.add('show');  // то же самое, но со вторым игроком
        players.setAttribute('class', 'players active');
    }
}

let playerXIcon = 'fas fa-times'
let playerOIcon = 'far fa-circle'

function clickedBox(element) {
    // if ()
}