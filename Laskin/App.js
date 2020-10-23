import React from 'react';
import {useState} from 'react'
//import './App.css';

function App() { 

  const [merkki1, setMerkki1] = useState('')
  const [operaattori, setOperaattori] = useState('')
  const [merkki2, setMerkki2] = useState('')
  const [vastaus, setVastaus] = useState('')
  
  const button1Pressed = () => {
    if(operaattori == '' && vastaus == '') {
      setMerkki1(merkki1 + '1')
    }
    else if(vastaus == '') {
      setMerkki2(merkki2 + '1')
    } 
  }

  const button2Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '2')
    }
    else {
      setMerkki2(merkki2 + '2')
    }
  }

  const button3Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '3')
    }
    else {
      setMerkki2(merkki2 + '3')
    }
  }

  const button4Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '4')
    }
    else {
      setMerkki2(merkki2 + '4')
    }
  }

  const button5Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '5')
    }
    else {
      setMerkki2(merkki2 + '5')
    }
  }

  const button6Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '6')
    }
    else {
      setMerkki2(merkki2 + '6')
    }
  }

  const button7Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '7')
    }
    else {
      setMerkki2(merkki2 + '7')
    }
  }

  const button8Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '8')
    }
    else {
      setMerkki2(merkki2 + '8')
    }
  }

  const button9Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '9')
    }
    else {
      setMerkki2(merkki2 + '9')
    }
  }

  const button0Pressed = () => {
    if(operaattori == '') {
      setMerkki1(merkki1 + '0')
    }
    else {
      setMerkki2(merkki2 + '0')
    }
  }

  const buttonjakoPressed = () => {
    setOperaattori('/')
    if(vastaus != '') {
      setMerkki1(vastaus)
      setMerkki2('')
      setVastaus('')
    }
  }

  const buttonkertoPressed = () => {
    setOperaattori('*')
    if(vastaus != '') {
      setMerkki1(vastaus)
      setMerkki2('')
      setVastaus('')
    }
  }
  
  const buttonplusPressed = () => {
    setOperaattori('+')
    if(vastaus != '') {
      setMerkki1(vastaus)
      setMerkki2('')
      setVastaus('')
    }
  }

  const buttonmiinusPressed = () => {
    setOperaattori('-')
    if(vastaus != '') {
      setMerkki1(vastaus)
      setMerkki2('')
      setVastaus('')
    }
  }

  const buttononyhtäkuinPressed = () => {
    //switch casea tähän
    if(operaattori == '/') {
      setVastaus(merkki1 / merkki2)
    }
    if(operaattori == '*') {
      setVastaus(merkki1 * merkki2)
    }
    if(operaattori == '+') {
      setVastaus(parseInt(merkki1) + parseInt(merkki2))
    }
    if(operaattori == '-') {
      setVastaus(merkki1 - merkki2)
    }
  }

  const buttonclearPressed = () => {
    setMerkki1('')
    setOperaattori('')
    setMerkki2('')
    setVastaus('')
  }

  return (
    <div>
      <div>
        <input readOnly value={merkki1} placeholder="Merkki1"></input>
        <input readOnly value={operaattori} placeholder="Operaattori"></input>
        <input readOnly value={merkki2} placeholder="Merkki2"></input>
      </div>
      <div>
        <button onClick={button1Pressed}>1</button>
        <button onClick={button2Pressed}>2</button>
        <button onClick={button3Pressed}>3</button>
        <button onClick={buttonjakoPressed}>/</button>
      </div>
      <div>
        <button onClick={button4Pressed}>4</button>
        <button onClick={button5Pressed}>5</button>
        <button onClick={button6Pressed}>6</button>
        <button onClick={buttonkertoPressed}>*</button>
      </div>
      <div>
        <button onClick={button7Pressed}>7</button>
        <button onClick={button8Pressed}>8</button>
        <button onClick={button9Pressed}>9</button>
        <button onClick={buttonplusPressed}>+</button>
      </div>
      <div>
        <button onClick={buttonclearPressed}>c</button>
        <button onClick={button0Pressed}>0</button>
        <button onClick={buttononyhtäkuinPressed}>=</button>
        <button onClick={buttonmiinusPressed}>-</button>
      </div>
      <input readOnly value={vastaus} placeholder="Vastaus"></input>
    </div>
  );
}

export default App;
