const selectBox =document.querySelector('.select-box'),
selectXBtn = selectBox.querySelector('.playerX'),
selectOBtn = selectBox.querySelector('.playerO'),
playBoard = document.querySelector('.play-board'),
allBox = document.querySelectorAll('section span'),
players = document.querySelector('.players'),
resultBox = document.querySelector('.result-box'),
wonText = resultBox.querySelector('.won-text'),
replayBtn = resultBox.querySelector('button');

window.onload = () => { // запустить процессы к загрузке страницы / once window.object is loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick listener in every possible span of the sections / в добавление onclick в каждом доступном спане в section
        allBox[i].setAttribute('onclick', 'clickedBox(this)')
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add('hide');  // выбор исчезает / makes selection hidden as players is choosen
        playBoard.classList.add('show');  // появляется игровое поле / appearance of the playboard
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add('hide');  //same but for the second player
        playBoard.classList.add('show');  // то же самое, но со вторым игроком
        players.setAttribute('class', 'players active player'); // ++ три класса в игрока
    }
}

let playerXIcon = 'fas fa-times'
let playerOIcon = 'far fa-circle'
let playerSign = 'X'
let runBot = true 

function clickedBox(element) {
    if(players.classList.contains('player')){
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add('active');
        playerSign = 'O'
        element.setAttribute('id', playerSign)
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add('active');
        element.setAttribute('id', playerSign)
    }
    selectWinner()
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; // выбранная клетка не используется после клика
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed()
    console.log(randomDelayTime)
    setTimeout(() => {
       bot(runBot) 
    }, randomDelayTime);
}


function bot (runBot){
    if(runBot){
        playerSign = 'O'
        let array = []; //for sorting blocks that remain | массив для оставшихся пустых клеток
        for (let i = 0; i < allBox.length; i++){
            if (allBox[i].childElementCount == 0){ 
                array.push(i)
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)] // getting random index for bot to fill | рандомные числа из массива пустых ячеек для бота
        if (array.length > 0){
            if(players.classList.contains('player')){
                playerSign = 'X'
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove('active');
                allBox[randomBox].setAttribute('id', playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove('active');
                allBox[randomBox].setAttribute('id', playerSign);
            }
            selectWinner()
        }
        allBox[randomBox].style.pointerEvents = "none"
        playBoard.style.pointerEvents = "auto";
        playerSign = 'X'
    }
}


function getClass(idname){
    return document.querySelector('.box' + idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign)
        return true;
}
function selectWinner(){
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)){
        console.log(playerSign + ' ' + 'is the winner!' )
        runBot = false 
        bot(runBot)
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show")
        }, 700);


        wonText.innerHTML = `Игрок <p>${ playerSign }</p>  победил!`
    } else {
        if (getClass(1) != ' ' && getClass(2) != '' && getClass(3) != '' && getClass(4) != '' && getClass(5) != '' && getClass(6) != '' && getClass(7) != '' && getClass(8) != '' && getClass(9) != ''){
            runBot = false 
        bot(runBot)
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show")
        }, 700);
        

        wonText.textContent = `Ничья :(`
        } 
    }
}
replayBtn.onclick = () => {
    window.location.reload()
}