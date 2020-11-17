import React, {useState, useReducer} from 'react'
import './App.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'handleAddition':
      return {counter: state.counter + 1}
    case 'handleSubtraction':
      return {counter: state.counter - 1}
    case 'handlePow':
      return {counter: state.counter * 2}
    default:
      return state
  }
}

function App() {

  //const [counter, setCounter] = useState(0)
  const [state, dispatch] = useReducer(reducer, {counter: 0})

  
  const handleAddition = () => {
    //setCounter(counter + 1)
    dispatch({type: 'handleAddition'})
  }

  const handleSubtraction = () => {
    //setCounter(counter - 1)
    dispatch({type: 'handleSubtraction'})
  }

  const handlePow = () => {
    //setCounter(counter * 2)
    dispatch({type: 'handlePow'})
  }

  return (
    <div>
      <button onClick={handleSubtraction}>-</button>
      {state.counter}
      <button onClick={handleAddition}>+</button>
      <button onClick={handlePow}>*</button>
    </div>
  )
}

export default App;
