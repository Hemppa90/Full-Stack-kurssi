import React, {useState, useReducer} from 'react'
import './App.css'

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_ADDITION:
      return {counter: state.counter + 1}
    case ACTIONS.HANDLE_SUBTRACTION:
      return {counter: state.counter - 1}
    case ACTIONS.HANDLE_POW:
      return {counter: state.counter * 2}
    default:
      return state
  }
}

const ACTIONS = {
  HANDLE_ADDITION: 'handleAddition',
  HANDLE_SUBTRACTION: 'handleSubtraction',
  HANDLE_POW: 'handlePow'
}

function App() {

  //const [counter, setCounter] = useState(0)
  const [state, dispatch] = useReducer(reducer, {counter: 0})

  
  const handleAddition = () => {
    //setCounter(counter + 1)
    dispatch({type: ACTIONS.HANDLE_ADDITION})
  }

  const handleSubtraction = () => {
    //setCounter(counter - 1)
    dispatch({type: ACTIONS.HANDLE_SUBTRACTION})
  }

  const handlePow = () => {
    //setCounter(counter * 2)
    dispatch({type: ACTIONS.HANDLE_POW})
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
