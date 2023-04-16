import { useState } from "react";
import './App.css'
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./components/Constants";
import { checkWinnerFron } from "./components/logic/Board";
import { WinnerModal } from "./components/WinnerModal";

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
  const newWinner = checkWinnerFron(newBoard)

  if (newWinner) {
    confetti()
    setWinner(newWinner)
    //en caso de empate
  }else if (checkEndGame(newBoard)){
    setWinner(false) 
  }
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
        <h2 className="versus">VS</h2>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      <WinnerModal
      resetGame={resetGame}
      winner={winner}/>
      
    </main>
    
  )
}

export default App;