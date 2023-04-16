import { WINNER_COMBOS } from "../Constants"

export const checkWinnerFron = (boardToCheck) => {
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