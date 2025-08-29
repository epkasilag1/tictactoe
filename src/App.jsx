import { useState } from 'react'
import './App.css'

function App() {
  const [playerScore, setScore] = useState([0, 0]);
  const names = ["Player 1", "Player 2"];

  return (
    <div className='h-[100vh]'>
      <Header />
      <div className="flex items-center justify-center w-full overflow-hidden select-none">
        <Player name={names[0]} playerScore={playerScore} />   
        <Board names={names} setScore={setScore} />
        <Player name={names[1]} playerScore={playerScore}/>  
      </div>
    </div>
  )
}

function Header() {
  return (
    <>
      <header className="text-center py-2 bg-gray-800 mb-32 md:mb-24">
        <img src="/tictactoe/images/ttt.gif" alt="tictactoe logo" />
      </header>
    </>
  )
}

function Player({name, playerScore}) {
  const player = name ? name : "Computer";

  return (
    <div className='text-center text-sm md:text-2xl font-semibold w-16 md:w-32'>
      <h1 className= {`text-bold text-5xl ${name=="Player 1" ? "text-red-500" : "text-green-700"}`}>{name=="Player 1" ? "X" : "O"}</h1>
      <h1>{player}</h1>
      <h2 className="text-2xl md:text-3xl mt-2 w-16 border border-black mx-auto bg-white rounded-md">{name=="Player 1" ? playerScore[0] : playerScore[1]}</h2>
    </div>
  )
}

function Board({names, setScore}) {
  const [cells, setCell] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(true)  
  const [winner, setWinner] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const winningConfigs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const updateCell = (index, playerTurn) => {
    setCell((prevCells) => {
      const newCells = [...prevCells]
      if (turn != playerTurn && !newCells[index]){
        newCells[index] = turn ? "X" : "O"
        let status = checkStatus(newCells)
        if (status){
          setShowResult(true)
        }
        else{
          nextTurn()
        }      
      }
    
      return newCells
    })
  }

  const checkStatus = (cells) => {
    let isWin = 0
    for (var i=0; i<winningConfigs.length; i++){

      let x = winningConfigs[i][0]
      let y = winningConfigs[i][1]
      let z = winningConfigs[i][2]
      if (cells[x] == cells[y] && cells[y] == cells[z] && cells[x]){
        setWinner(turn ? 0 : 1);
        return true
      }
    }
    // If no winner but no empty cells → draw
      if (cells.filter(c => c === null).length === 0) {
        setWinner(-1); // use -1 for draw
        return true;
      }
    return isWin
  }

  const nextTurn = () => {
    setTurn(() => {
      return !turn
    })
  }

  const reset = () => {
    setScore((scores) => {
    if (winner === 0) {
        return [scores[0] + 1, scores[1]];
      } else if (winner === 1) {
        return [scores[0], scores[1] + 1];
      }
      return scores; // no change if draw
    });

    setCell(() => {
      return Array(9).fill(null)
    })

    setTurn(() => {
      return true
    })

    setShowResult(false)
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-2xl md:text-3xl mb-2"><span className='font-semibold'>{turn ? names[0] : names[1]}</span>'s turn</h1>
      <div className='flex items-center p-1 md:p-2 bg-white/70 mx-4 rounded-lg border'>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {
            cells.map((num, index) => (
              <button 
                className={`border border-gray-500 bg-gray-300 text-3xl font-bold w-12 h-12 sm:w-16 sm:h-16 md:w-32 md:h-32 md:text-3xl rounded-lg hover:bg-gray-600 active:bg-gray-800 ${cells[index]=="X" ? "text-red-500" : "text-green-700"}`} 
                key={index} 
                onClick={() => updateCell(index)}>
                {num && <span className="slide-in-top">{num}</span>}
              </button>
            ))
          }
        </div>
      </div>
      { showResult && 
          (<div className="absolute inset-0 bg-amber-100 bg-opacity-50 flex flex-col items-center justify-center z-10 w-72 h-42 m-auto border-8 border-gray-600 rounded-lg animate-fadeInScale">
            <p className="text-black text-xl font-bold font-mono">Result</p>
            <h2 className="font-bold text-2xl p-2">{winner == -1 ? 'Draw!' : `${names[winner]} wins!`}</h2>
            <button 
              className="playButton border border-black p-2 rounded-xl bg-green-400 text-white text-xl font-bold hover:bg-green-500 active:bg-green-700"
              onClick={() => reset()}>
                Play again
            </button>
          </div>)
        }
    </div>
  )
}

export default App
