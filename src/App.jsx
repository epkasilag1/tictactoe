import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <Board />
      </div>
    </>
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
    <div className='flex items-center justify-center'>
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {
          cells.map((num, index) => (
            <button className="border border-gray-500 bg-gray-400 text-white text-3xl w-24 h-24 md:w-42 md:h-42 rounded-lg hover:bg-gray-600 active:bg-gray-800" key={index} onClick={() => updateCell(index)}>{num}</button>
          ))
        }
      </div>
    </div>
  )
}

export default App
