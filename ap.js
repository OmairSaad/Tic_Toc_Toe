const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart= document.querySelector("#restart");
const winConditions =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options =["", "", "", "", "", "", "", "", ""];
let current = "X";
let running = false;

initilizing();
function initilizing(){
    running=true;
    cells.forEach(cell=> cell.addEventListener("click", cellCliked));
    restart.addEventListener("click", RESTART);
    status.textContent=`${current}'s turn`;
}

function cellCliked(){
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex]!="" || !running){
    return;
  }
  updation(this, cellIndex);
  checkWinner();
}

function updation(cell, index){
  options[index]=current;
  cell.textContent=current;
}
function changePlayer(){
current = (current=="X")? "O" : "X";
status.textContent=`${current}'s turn`;

}
function checkWinner(){
    let round = false;
   for (let i=0; i<winConditions.length; i++){
    const condition = winConditions[i];
    const cellA= options[condition[0]];
    const cellB= options[condition[1]];
    const cellC= options[condition[2]];
    if(cellA=="" || cellB=="" || cellC==""){
        continue;
    }
    if (cellA==cellB && cellB==cellC ){
        round=true;
        break;
    }
   }
   if (round){
    status.textContent=`${current} Wins!`;
    running= false;
   }
   else if (!options.includes("")){
    status.textContent=`Draw!`;
    running= false;
   }
   else{
    changePlayer();
   }
}

function RESTART(){
    current= "X";
    status.textContent=`${current}'s turn`;
    options =["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell=> cell.textContent="");
    running=true;

}