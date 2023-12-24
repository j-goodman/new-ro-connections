data = data.toUpperCase()
const dataRows = data.split("\n")
const rows = []
const board = document.getElementsByClassName("board")[0]

let selectList = []

dataRows.forEach(row => {
    rows.push(row.split("\t"))
})

let correctGuesses = []
let colorsByRow = {}
for (let i = 1; i < rows.length; i++) {
    correctGuesses.push(rows[i].slice(2, 6).sort().join(","))
    colorsByRow[rows[i].slice(2, 6).sort().join(",")] = rows[i][1]
}

function shuffleArray(array) {
    const shuffledArray = array.slice()
   
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
  
    return shuffledArray;
}

let allSquares = []

const squareClick = event => {
    let target = event.target
    target.classList.add("clicked")
    selectList.push(target.innerText)
    if (selectList.length === 4) {
        checkList(selectList)
    }
}

const checkList = (list) => {
    const row = list.sort().join(",")
    if (correctGuesses.includes(row)) {
        console.log("Correct!")
        selectList.forEach(square => {
            console.log(square)
            allSquares.forEach(square => {
                if (row.includes(square.innerText)) {
                    square.classList.add(colorsByRow[row].toLowerCase())
                }
            })
        })
    } else {
        console.log("Not correct.")
    }
    allSquares.forEach(square => {
        square.classList.remove("clicked")
        selectList = []
    })
}

for (let x = 1; x < 5; x++) {
    const row = rows[x];
    for (let i = 2; i < 6; i++) {
        const square = document.createElement("div")
        square.onclick = squareClick
        square.innerText = row[i]
        allSquares.push(square)
    }   
}

allSquares = shuffleArray(allSquares)

allSquares.forEach(square => {
    board.appendChild(square)
})