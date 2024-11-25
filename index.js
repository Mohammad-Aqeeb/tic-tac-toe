let boxes = document.querySelectorAll(".box");
let newGameButton = document.querySelector(".newGameButton");
let gameInfo = document.querySelector(".gameInfo");

let player;
let gameGrid;
let winnigPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
function initialize(){
    player = 'x';
    gameInfo.textContent = `current player - ${player}`;
    gameGrid = ["","","","","","","","",""]
    for(let box of boxes){
        box.textContent = "";
        box.classList.remove('win');
        box.style.pointerEvents = 'All';
    }
    newGameButton.classList.remove('active');
}

initialize();

function changePlayer(){
    if(player == 'x')
    {
        player = 'o';
    }
    else{
        player = 'x'
    }
    gameInfo.textContent = `current player - ${player}`;
}

function checkGameOver(){
 
    let winner="";

    // (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
    winnigPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&(gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]))
        {
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');            

            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            });

            winner = gameGrid[position[0]];
        }

    });

    if(winner!==""){
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameButton.classList.add('active');
        return; 
    }

    let fillcount = 0;
    gameGrid.forEach((value)=>{
        if(value === "")
        {
            fillcount++;    
        }
    });
    console.log(fillcount);
    if(fillcount !=0 )
    {
        console.log('sdf');
    }
    else{
        gameInfo.innerText = 'Game Tie!';
        newGameButton.classList.add('active');
    }
}

function handleCheck(index){
    if(gameGrid[index]=="")
    {
        boxes[index].innerText = player;
        gameGrid[index] = player;
        changePlayer();
        checkGameOver();
    }
}

boxes.forEach((box, index)=>{
    boxes[index].addEventListener('click',function(){
        handleCheck(index); 
    });
});

newGameButton.addEventListener('click', function(){
    initialize();
});