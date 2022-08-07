var lasttime = 0;
let SNAKE_SPEED = 3;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = inputDirection;
const EXPENTION_AMOUNT =1;
var score =0;


const snakeBody = [
    { x: 8, y: 8 },
     
];

let food = getFoodRandomPosition();
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");

function paint(currenttimer) {

    var timeSeconds = (currenttimer - lasttime) / 1000;

    requestAnimationFrame(paint); // loop ke liyee 
    if (timeSeconds < 1 / SNAKE_SPEED) return;
    lasttime = currenttimer;

    // console.log("princy")

    update();//processing ke liye agar snake dibaar se bhid jayega ya fr apple ko khayga
    draw();//snake ki length ko bdhnana ke kaam

}

window.requestAnimationFrame(paint);
// requestAnimationFrame animation ke liye 


function draw() {
    drawsnake();
    drawFood();


}
function update() {
    gameBoard.innerHTML = "";
    snakeMove();
    snakeEatFood();
}

function drawsnake() {
    snakeBody.forEach((segment, index) => {

        var snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        // snakeElement.innerHTML = index;

        snakeElement.style.transform = " rotate(0deg)";

        if (index == 0) {
            snakeElement.classList.add("head");


            if (inputDirection.x == 1) {
                snakeElement.style.transform = " rotate(-90deg)";
            }
            else if (inputDirection.x == -1) {
                snakeElement.style.transform = " rotate(-90deg)";
            }

            else if (inputDirection.y == -1) {
                snakeElement.style.transform = " rotate(180deg)";

            }
            else if (inputDirection.y == 1) {

                snakeElement.style.transform = " rotate(0deg)";

            }

        }

        else {
            snakeElement.classList.add("snake");

        }
        gameBoard.appendChild(snakeElement);


    });
}


function drawFood() {

    var foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;

    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
    
}


function snakeMove() {
    inputDirection = getInputDirection();

    for (i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] } //construct kiya h
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    checkGameOver();

}

function getInputDirection() {
    window.addEventListener("keydown", e => {
        // console.log(e.key);

        switch (e.key) {
            case 'ArrowUp':
                if (lastInputDirection.y == 1)
                    break;
                inputDirection = { x: 0, y: -1 }
                break;

            case 'ArrowDown':
                if (lastInputDirection.y == -1)
                    break;

                inputDirection = { x: 0, y: 1 }
                break;

            case 'ArrowLeft':
                if (lastInputDirection.x == 1)
                    break;

                inputDirection = { x: -1, y: 0 }
                break;

            case 'ArrowRight':
                if (lastInputDirection.x == -1)
                    break;

                inputDirection = { x: 1, y: 0 }
                break;

            default: inputDirection = { x: 0, y: 0 }

        }
    })

    lastInputDirection = inputDirection;
    return inputDirection;




}

function snakeEatFood() {

    if (isEat()) {
        // console.log("eated");
        score += 5;
        scoreBox.innerHTML = score;
        food = getFoodRandomPosition();
        SNAKE_SPEED++;
        expandSnake();

    }

}

function isEat() {
    return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
    
}


function getFoodRandomPosition(){

    let a,b,myCondition = true;
    while(myCondition){
        a = Math.ceil(Math.random()*16);
        b = Math.ceil(Math.random()*16);

        myCondition = snakeBody.some(segment=>{
            return segment.x === a && segment.y ===b;
        })

    }
    return { x : a, 
        y:b};
}


function expandSnake(){
    for(i=0; i<EXPENTION_AMOUNT; i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }
}



function checkGameOver(){

    if(snakeOutOfGrid() || snakeInterSection()){
        location.reload();
        alert("Game Over : You Loose");
    }
}

function snakeOutOfGrid(){
    return snakeBody[0].x <0  || snakeBody[0].x>16 || snakeBody[0].y<0 || snakeBody[0]>16;

}
function snakeInterSection(){
    for(i=1; i<snakeBody.length; i++){
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y ){
          return true;
        }
    }

}