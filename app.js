
let score = 0
let rows=4
let cols=4
let board = [
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0]
]

let hasWon=false
let copyBoard=[]

function createCopy(){
    for(let r=0;r<rows;r++){
        let copyRow=[]
        for(let c=0;c<cols;c++){
            copyRow.push(board[r][c])
        }
        copyBoard.push(copyRow)
    }
}
function gameOver(){
    let a = board.toString()
    let b= copyBoard.toString()
if(a === b){
    document.querySelector('.game-over').style.visibility='visible'
    document.querySelector('.final-score').innerText='You have achieved a final score of '+score+'!' 
}
}

function clearCopy(){
    copyBoard=[]
}


function drawBoard(){
    for(let r=0; r<rows; r++ ){
        for(let c=0; c<cols; c++){
let tile = document.createElement('div')
tile.id=r.toString()+ '-' + c.toString()
let value=board[r][c]
updateValue(tile, value);
document.getElementById('board').append(tile);
        }
    }
}

function updateValue(tile,value){
    tile.innerText='';
    tile.className='tile'
7
    if(value>0){
        tile.innerText=value
    }
    if(value == 0){
        tile.style.backgroundColor='lightgrey'
    }
    else if(value == 2){
        tile.style.backgroundColor='#eee4da'
    }
    else if(value==4){
        tile.style.backgroundColor='#ece0ca'
    }
    else if(value==8){
        tile.style.backgroundColor='#f4b17a'
    }
    else if(value==16){
        tile.style.backgroundColor='#f59575'
    }
    else if(value==32){
        tile.style.backgroundColor='#f57c5f'
    }
    else if(value==64){
        tile.style.backgroundColor='#f65d3b'
    }
    else if(value==128){
        tile.style.backgroundColor='#edce71'
    }
    else if(value==256){
        tile.style.backgroundColor='#edcc63'
    }
    else if(value==512){
        tile.style.backgroundColor='#edc651'
    }
    else if(value==1024){
        tile.style.backgroundColor='#eec744'
    }
    else if(value==2048){
        tile.style.backgroundColor='#ecc230'
    }
    else if(value==4096){
        tile.style.backgroundColor='#fe3d3d'
    }
    else {
        tile.style.backgroundColor='#ff2020'
    }
}

function tileGenerator(){
    if(!checkEmptyTile()){
        return;
    }
    let r= Math.floor(Math.random()* rows)
    let c=Math.floor(Math.random()*cols)
    let i=Math.floor(Math.random()*4)
    let arr=[2,2,2,4]
    if(board[r][c] == 0){
        if(board.some((a)=>a.includes(256))){
            board[r][c]=arr[i];
        }
        else{board[r][c]=2}
        let value = board[r][c]
        let tile = document.getElementById(r.toString()+'-'+c.toString())
        updateValue(tile, value)
    }
    else{tileGenerator()}
}

function checkEmptyTile(){
    if(!board.some((a)=>a.includes(0))){
return false
    }
    else return true
}

document.addEventListener('keyup', event=>{
    switch(event.code){
        case "ArrowDown":
            clearCopy()
        createCopy()  
        moveDown()
        winner()
        gameOver();
            break;
        case "ArrowLeft":
            clearCopy()
            createCopy()
            moveLeft()
            winner()
            gameOver();
            break;
        case "ArrowUp":
            clearCopy()
            createCopy()
            moveUp()
            winner()
            gameOver();
            break;
        case "ArrowRight":
            clearCopy()
        createCopy()
        moveRight()
        winner()
        gameOver();
        break;
    }
})
removeZero = (row) => row.filter(num=> num!= 0);


function slide(row){
    row = removeZero(row);
    for(let i=0; i<row.length - 1; i++){
        if(row[i] == row[i + 1]){
            row[i] = row[i] * 2;
            row[i + 1] = 0;
            score += row[i]; 
            document.getElementById('score').innerText='score: '+score       
        }
    }
    row=removeZero(row) 
    while(row.length<rows){
        row.push(0)
    }
    return row
}

function moveUp(){
   
    for(let c=0; c<cols; c++){
let row=[board[0][c], board[1][c], board[2][c], board[3][c]];

row=slide(row)

for(let r=0; r<rows; r++){
    board[r][c]=row[r] 
    let value=board[r][c]
let tile=document.getElementById(r.toString()+'-'+ c.toString())
updateValue(tile, value)
}

}
    tileGenerator()
}

function moveLeft(){
    
    
    for(let r=0; r<rows; r++){
        let row=board[r]
       row=slide(row)
       board[r] = row
      for(let c=0;c<cols;c++){
       let value = board[r][c]
    let tile = document.getElementById(r.toString() + '-'+ c.toString())
    updateValue(tile, value)
      }

    }
    
        tileGenerator()
    
}

function moveDown(){
   
    for(let c=0; c<cols; c++){
        let row=[board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row=slide(row)
        row.reverse()
        for(let r=0; r<rows; r++){
            board[r][c]=row[r] 
      
            let value=board[r][c]
        let tile=document.getElementById(r.toString()+'-'+ c.toString())
        updateValue(tile, value)
        }
        
        }
            tileGenerator()
}

function moveRight(){
    
   for(let r=0; r<rows;r++){
    let row= board[r]
    row.reverse()
    row = slide(row)
    row.reverse()
    board[r]=row
    for(let c=0; c<cols; c++){
    let value= board[r][c]
    let tile=document.getElementById(r.toString()+'-'+c.toString())
    updateValue(tile, value)
   }
}
tileGenerator()
}

function reset(){
    for(let r=0; r<rows;r++){
     for(let c=0; c<cols;c++){
         board[r][c]=0
         let value= board[r][c]
         let tile=document.getElementById(r.toString()+'-'+c.toString())
     updateValue(tile,value)
     score=0
     document.getElementById('score').innerText='score: 0'
     }
    }
    tileGenerator()
    tileGenerator()
    document.querySelector('.game-over').style.visibility='hidden'
    
 }


  function retry(){
    document.querySelector('.game-over').style.visibility='hidden'
    document.querySelector('.game-won').style.visibility='hidden'
    
}

  function redo(){
   board=copyBoard
   for(let r=0; r<rows;r++){
    for(let c=0; c<cols;c++){
        let value= board[r][c]
        let tile=document.getElementById(r.toString()+'-'+c.toString())
    updateValue(tile,value)
  }
}

  }

  function winner(){
    if(!hasWon && board.some((a)=>a.includes(2048))){
        document.getElementById('game-won').style.visibility='visible'
    console.log('background should show')
    hasWon=true
    }
}

function runGame(){
    drawBoard()
    tileGenerator()
    tileGenerator()

}


runGame()

