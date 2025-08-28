import { useState } from 'react'
import './App.css'

function App() {
  const [playerScore, setScore] = useState([0, 0]);
  const name = "Player";
  return (
    <>
      <div className="flex items-center justify-center h-[100vh] w-full overflow-hidden select-none">
        <Player name={name} playerScore={playerScore} />   
        <Board name={name} />
        <Player playerScore={playerScore}/>
      </div>
    </>
  )
}

function Player({name, playerScore}) {
  const player = name ? name : "Computer";

  return (
    <div className='text-center text-sm md:text-2xl font-semibold w-16 md:w-32'>
      <h1 className= {`text-bold text-5xl ${name ? "text-red-500" : "text-green-700"}`}>{name ? "X" : "O"}</h1>
      <h1>{player}</h1>
      <h2 className="text-2xl md:text-3xl mt-2 w-16 border border-black mx-auto bg-white rounded-md">{name ? playerScore[0] : playerScore[1]}</h2>
    </div>
  )
}

function Board({name}) {

  const [cells, setCell] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(true)

  const updateCell = (index, playerTurn) => {
    setCell((prevCells) => {
      const newCells = [...prevCells]
      if (turn != playerTurn & !newCells[index]){
        newCells[index] = turn ? "X" : "O"
        nextTurn()
      }
      return newCells
    })
  }

  const nextTurn = () => {
    setTurn(() => {
      return !turn
    })
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-2xl md:text-3xl mb-2"><span className='font-semibold'>{turn ? name : "Computer"}</span>'s turn</h1>
      <div className='flex items-center p-1 md:p-2 bg-white/70 mx-4 rounded-lg border'>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {
            cells.map((num, index) => (
              <button className={`border border-gray-500 bg-gray-300 text-3xl font-bold w-12 h-12 sm:w-16 sm:h-16 md:w-32 md:h-32 md:text-3xl rounded-lg hover:bg-gray-600 active:bg-gray-800 ${cells[index]=="X" ? "text-red-500" : "text-green-700"}`} key={index} onClick={() => updateCell(index)}>{num}</button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
