let boxes = document.querySelectorAll('.game--box');
let resetBtn = document.querySelector('.reset-btn');
let result = document.getElementById('game-result-container');

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
];

// firstPlayerTurn -> O if true, X if false.
let firstPlayerTurn = true;

function handleBoxClick () {
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (firstPlayerTurn) {
                box.innerText = 'O'
                firstPlayerTurn = false;
            } else {
                box.innerText = 'X'
                firstPlayerTurn = true;
            }
    
            box.disabled = true;
    
            checkWinner();
        })
    })
}

function handleResetBtn () {
    resetBtn.onclick = () => {
        boxes.forEach((box) => {
           box.innerText = '';
           box.disabled = false;
           result.innerText = '';
    
           firstPlayerTurn = true;
        })
    }
}

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                result.innerText = `Winner is ${pos1}`;
                disableAllBoxes();
            }
        } else {
            checkTie();
        }
    }
};

function disableAllBoxes() {
    boxes.forEach(box => box.disabled = true);
}

function checkTie() {
    let isGameTie = true;

    boxes.forEach(box => {
        if (box.innerText.trim() === '') {
            isGameTie = false;
            return;
        }
    });

    if (isGameTie) {
        result.innerText = `It's a Tie.`;
    }
}

handleBoxClick();
handleResetBtn();