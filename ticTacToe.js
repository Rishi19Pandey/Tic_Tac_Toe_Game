var intitalTurn = "X";
var firstSelect;
var isGameOver = false;
var count = 0;

document.querySelector("#submitBTN").addEventListener('click', getVal);

//! Get Value

function getVal() {
    const data = document.getElementsByName("radio1");
    var i = 0;
    for (i; i < data.length; i++) {
        if (data[i].checked) {
            intitalTurn = data[i].value;
            firstSelect = intitalTurn;
            document.querySelector(".info").innerHTML = "Turn For " + intitalTurn;
            document.querySelector(".before_match").style.display = "none";
        }
    }
}

//!  Change Turn Logic

const changeTurn = () => {
    if (intitalTurn === "X") {
        intitalTurn = "O";
        return intitalTurn;
    }
    else {
        intitalTurn = "X";
        return intitalTurn
    }
}

//!   Game Logic
function logic() {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        let boxText = element.querySelector(".boxtext");
        element.addEventListener('click', () => {
            count = count + 1;
            if (boxText.innerText === '') {
                if (isGameOver) {
                    function over() {
                        boxes.forEach(ele => {
                            ele.style.cursor = "not-allowed";
                        })
                    }

                }
                if (!isGameOver) {
                    boxText.innerText = intitalTurn;
                    turn = changeTurn();
                    document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
                    checkWin();

                }
                //?  Draw Match Logic
                drawMatch();
            }
        })
    })
}

logic();

//!     Game win Logic

const checkWin = () => {
    let boxText = document.getElementsByClassName("boxtext");
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    win.forEach(e => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText) && (boxText[e[0]].innerText !== "")) {
            boxText[e[0]].style.color = "red";
            boxText[e[1]].style.color = "red";
            boxText[e[2]].style.color = "red";
            document.querySelector(".info").innerText = boxText[e[0]].innerText + " WON";
            const addStyle = document.querySelector(".info").style.color = "red";
            isGameOver = true;
            setTimeout(automaticClean, 2000);
        }
    })
}


//!         reset Button

document.querySelector("#reset").addEventListener('click', resetGame);


//!             Automatic reset Game

function automaticClean() {
    resetGame();
}



function resetGame() {
    let boxTexts = document.querySelectorAll(".boxtext");
    Array.from(boxTexts).forEach(element => {
        element.innerText = "";
        element.style.color = "black";
    });
    intitalTurn = firstSelect;
    isGameOver = false;
    document.getElementsByClassName("info")[0].innerText = " Turn For " + intitalTurn;
    document.querySelector(".info").style.color = "black";
    count = 0;
}


//!     Draw Logic

function drawMatch() {
    if (count == 9 && isGameOver == false) {
        document.getElementsByClassName("info")[0].innerText = "Match Draw";
        document.querySelector(".info").style.color = "red";
        count = 0;
        setTimeout(automaticClean, 2000);
    }
}


// Show massage

document.querySelector("#heart").addEventListener('click', () => {
    var msg = "Thanks for love this game";
    document.querySelector(".showlove").innerText = msg + "🧡";
})