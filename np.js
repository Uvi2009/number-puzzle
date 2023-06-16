const puzzleBoard= document.querySelector(".board")
let size=3
let puzzle=[]
let puzzle1=[]
let i=0

startGame()


function startGame(){
generatePuzzle()
randomisePuzzle()
renderPuzzle()
handleClick()
}

function generatePuzzle(){
    for(let i=1;i<=9;i++){
        puzzle.push({
            value:i,
            position : i,
            x:(getRow(i)-1)*200,
            y:(getCol(i)-1)*200,
            x1:(getRow(i)-1)*200,
            y1:(getCol(i)-1)*200,
            disabled:false
        })
    }
puzzle1=puzzle
console.log(puzzle1)
}

function getCol(i){
    const col=i%size
    if(col===0){
        return size
    }
    return col
}

function getRow(i){
    
    return Math.ceil(i/size)
}



function randomisePuzzle(){
    const randomValues=getRandomValues()
    let i=0
    for (let puzzleItem of puzzle){
        puzzleItem.value=randomValues[i]
        i++
       //console.log(puzzleItem.value)
    }

    const puzzleWith9=puzzle.find((item)=>item.value==9)
    puzzleWith9.disabled=true
   
    
}

function getRandomValues(){
    const values=[]
    for(let i=1;i<=9;i++){
        values.push(i)
       
    }
    values.sort(()=>Math.random()-0.5)
   
    return values
}

function renderPuzzle(){
    puzzleBoard.innerHTML=""
    for(let puzzleItem of puzzle){
         
        if(puzzleItem.disabled){ continue;}
        puzzleBoard.innerHTML+=`<div class=\"box\" style="left : ${puzzleItem.x}px; top: ${puzzleItem.y}">
        ${puzzleItem.value}
        </div>`
    }
    console.log(puzzle)
}


function handleClick(){
   document.addEventListener("keydown",handleKeyDown)
}


function handleKeyDown(e){
    console.log(e.key)
    switch(e.key){
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowUp":
            moveUp()
            break
        }
        
}
//left
function moveLeft(){
    const emptyPuzzle=getEmptyPuzzle()
    const rightPuzzle=getRightPuzzle(emptyPuzzle)
    if(rightPuzzle){
         swapPositions(emptyPuzzle,rightPuzzle,true)
    }
    renderPuzzle()
        checkWin()
}

function getRightPuzzle(emptyPuzzle){
    const isRightEdge=getRow(emptyPuzzle.position)===3
    if(isRightEdge){
        return null
    }
    return puzzle.find((item)=> item.position==(emptyPuzzle.position+3))
}
//right
function moveRight(){
    const emptyPuzzle=getEmptyPuzzle()
    const leftPuzzle=getLeftPuzzle(emptyPuzzle)
    if(leftPuzzle){
        swapPositions(emptyPuzzle,leftPuzzle,true)
   }
   renderPuzzle()
        checkWin()
}

function getLeftPuzzle(emptyPuzzle){
    const isLeftEdge=getRow(emptyPuzzle.position)===1
    if(isLeftEdge){
        return null
    }
    return puzzle.find((item)=> item.position==(emptyPuzzle.position-3))
}
//down
function moveDown(){
    const emptyPuzzle=getEmptyPuzzle()
    const upPuzzle=getUpPuzzle(emptyPuzzle)
    if(upPuzzle){
        swapPositions(emptyPuzzle,upPuzzle,false)
   }
   renderPuzzle()
        checkWin()
}

function getUpPuzzle(emptyPuzzle){
    const isUpEdge=getCol(emptyPuzzle.position)===1
    if(isUpEdge){
        return null
    }
    return puzzle.find((item)=> item.position==(emptyPuzzle.position-1))
}
//up
function moveUp(){
    const emptyPuzzle=getEmptyPuzzle()
    const downPuzzle=getDownPuzzle(emptyPuzzle)
    if(downPuzzle){
        swapPositions(emptyPuzzle,downPuzzle,false)
   }
   renderPuzzle()
        checkWin()
}

function getDownPuzzle(emptyPuzzle){
    const isDownEdge=getCol(emptyPuzzle.position)===3
    if(isDownEdge){
        return null
    }
    return puzzle.find((item)=> item.position==(emptyPuzzle.position+1))
}


function getEmptyPuzzle(){
    return puzzle.find((item)=> item.disabled)
}

function swapPositions(firstPuzzle,secondPuzzle,isY){
   //changing the positions values
    let temp=firstPuzzle.position
    firstPuzzle.position=secondPuzzle.position
    secondPuzzle.position=temp
    
    //changing the padding values
    if(isY){
        let temp=firstPuzzle.x
    firstPuzzle.x=secondPuzzle.x
    secondPuzzle.x=temp
       
    }
    else{
        let temp=firstPuzzle.y
        firstPuzzle.y=secondPuzzle.y
        secondPuzzle.y=temp
    }

}


function checkWin(){
    return puzzle.every((item)=>{
        item.x==(getRow(item.value)*200)&& item.y==(getCol(item.value)*200)
    })  
  //return puzzle.every((item)=>item.x==item.x1 && item.y==item.y1)
}

if(checkWin()){
    console.log(fuck)
}



















