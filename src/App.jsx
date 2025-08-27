import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-[100vh] w-full overflow-hidden bg-gray-100">
        <Player name="Eugene" />   
        <Board />
        <Player />
      </div>
    </>
  )
}

function Player({name}) {
  const player = name ? name : "Computer";
  const [score, setScore] = useState(0);

  return (
    <div className='text-center text-sm md:text-2xl font-semibold'>
      <h1>{player}</h1>
      <h2 className="text-2xl md:text-6xl">{score}</h2>
    </div>
  )
}

function Board() {

  const [cells, setCell] = useState(Array(9).fill(0))

  const updateCell = (index) => {
    setCell((prevCells) => {
      const newCells = [...prevCells]
      newCells[index] += 1
      return newCells
    })
  }

  return (
    <div className='flex items-center p-4 bg-white mx-4 rounded-lg border'>
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {
          cells.map((num, index) => (
            <button className="border border-gray-500 bg-gray-400 text-white text-3xl w-12 h-12 sm:w-16 sm:h-16 md:w-32 md:h-32 md:text-3xl rounded-lg hover:bg-gray-600 active:bg-gray-800" key={index} onClick={() => updateCell(index)}>{num}</button>
          ))
        }
      </div>
    </div>
  )
}

export default App
