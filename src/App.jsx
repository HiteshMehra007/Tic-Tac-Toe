import { useState } from 'react';
import { images } from "./constants";


function App() {
  const [ isGameStarted, setGameStarted ] = useState(false);
  const [ isCross, setCross ] = useState(true);
  const [ moves, setMoves ] = useState(0);

  const freshgrid = [ -1, -1, -1, -1, -1, -1, -1, -1, -1];

  const [board, setBoard] = useState(freshgrid);


  const handleMoves = (idx) => {
    if(winner !== "") return;
    setGameStarted(true);
    setMoves((prev) => prev+1);
    const newBoard = [...board];
    if(isCross) newBoard[idx] = 1;
    else newBoard[idx] = 0;

    setCross((prev) => !prev);
    setBoard(newBoard);
  }

  const checkWinner = () => {
    if(!isGameStarted) return "";
    if(moves > 9) return "Tie";

    // vertical checks
    for(let i=0; i<3; i++){
      if(board[i] === -1) continue;
      if(board[i] === board[i+3] && board[i] === board[i+6]){
        if(board[i] == 1){
          return "Cross wins";
        }
        else{
          return "Circle wins";
        }
      }
    }

    // horizontal checks
    for(let i=0; i<=6; i+=3){
      if(board[i] === -1) continue;
      if(board[i] === board[i+1] && board[i] == board[i+2]){
        if(board[i] == 1){
          return "Cross wins";
        }
        else{
          return "Circle wins";
        }
      }
    }

    // diagonal checks
    if(board[0] !== -1 && board[0] === board[4] && board[0] === board[8]){
      if(board[0] == 1){
        return "Cross wins";
      }
      else{
        return "Circle wins";
      }
    }

    if(board[2] !== -1 && board[2] === board[4] && board[2] === board[6]){
      if(board[2] == 1){
        return "Cross wins";
      }
      else{
        return "Circle wins";
      }
    }

    if(moves == 9) return "Tie";
    return "";
    
  };

  const winner = checkWinner();

  const resetGame = () => {
    setGameStarted(false);
    setMoves(0);
    setBoard(freshgrid);
  }

  return (
    <div className='max-w-80 border border-gray-700 flex flex-col mx-auto'>
      <div className='text-center w-full border-b border-gray-700'>
        <h1 className='font-bold text-lg'>Tic Tac Toe</h1>
      </div>
      {
        (winner != "") 
        && 
        <div className=' flex justify-between p-2 text-center w-full mt-3'>
          <p className='text-md'>{winner}</p>
          <button onClick={() => resetGame()} className='bg-blue-400 px-3 py-1 text-white font-bold rounded-full'>Restart</button>
        </div>
      }
      <div className='board grid grid-rows-3 grid-cols-3'>
        {
          board.map((ele, idx) => {
            return (
              <div 
                key={idx}
                className='bg-gray-200 border border-gray-700 p-2 min-h-24 min-w-24'
                onClick={() => handleMoves(idx)}
              >
                {
                  (board[idx] !== -1) && <img src={board[idx] === 1 ? images.cross: images.circle} alt="image" />
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App;