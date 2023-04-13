import { useState } from "react";
import './App.css'

const TURNS = {
  x:'x',
  o:'o'
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


// componente para cada uno de los cuadritos
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}



function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  // estado para saber de quien es el turno
  const [turn, setTurn] = useState(TURNS.x)

  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return (
      newBoard.every((square) => square !== null)
    )
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn == TURNS.x ? TURNS.o : TURNS.x 
    setTurn(newTurn)
    // revisar si hay ganador 
  const newWinner = checkWinner(newBoard)

  if (newWinner) {
    setWinner(newWinner)
    //en caso de empate
  }else if (checkEndGame(newBoard)){
    setWinner(false) 
  }
  }

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
      {return boardToCheck[a]}
    }
    return null
  }

  // reseteamos el estado a sus valores iniciales 
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }


  return(
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>REINICIAR EL JUEGO</button>
      <section className="game">
        {
          board.map((square,index) => {
            return(
        
              <Square
              key={index} //solo en este caso el id unico es el index
              index={index}
              updateBoard={updateBoard}
              >
              {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? 'empate' : 'GANO EL JUGADOR' 
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>EMPEZAR DE NUEVO</button>
                </footer>

              </div>
            </section>
          )
        }
      
    </main>
    
  )
}

export default App;