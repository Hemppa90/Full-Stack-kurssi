import React, { useEffect } from 'react';
import {useState} from 'react';
import './App.css';

function App() {

  const [ruudunTila1, setRuudunTila1] = useState('')
  const [ruudunTila2, setRuudunTila2] = useState('')
  const [ruudunTila3, setRuudunTila3] = useState('')
  const [ruudunTila4, setRuudunTila4] = useState('')
  const [ruudunTila5, setRuudunTila5] = useState('')
  const [ruudunTila6, setRuudunTila6] = useState('')
  const [ruudunTila7, setRuudunTila7] = useState('')
  const [ruudunTila8, setRuudunTila8] = useState('')
  const [ruudunTila9, setRuudunTila9] = useState('')
  const [pelaaja, setPelaaja] = useState(1)
  const [ratkesikoPeli, setRatkesikoPeli] = useState(false)
  const [voittaja, setVoittaja] = useState('')

  const tarkastaVoitto = () => {
    if((ruudunTila1 == 'X' && ruudunTila2 == 'X' && ruudunTila3 == 'X') || 
       (ruudunTila4 == 'X' && ruudunTila5 == 'X' && ruudunTila6 == 'X') || 
       (ruudunTila7 == 'X' && ruudunTila8 == 'X' && ruudunTila9 == 'X') || 
       (ruudunTila1 == 'X' && ruudunTila4 == 'X' && ruudunTila7 == 'X') ||
       (ruudunTila2 == 'X' && ruudunTila5 == 'X' && ruudunTila8 == 'X') ||
       (ruudunTila3 == 'X' && ruudunTila6 == 'X' && ruudunTila9 == 'X') ||
       (ruudunTila1 == 'X' && ruudunTila5 == 'X' && ruudunTila9 == 'X') ||
       (ruudunTila3 == 'X' && ruudunTila5 == 'X' && ruudunTila7 == 'X')) {
      
      setRatkesikoPeli(true)
      setVoittaja(1)
    }
    else if((ruudunTila1 == 'O' && ruudunTila2 == 'O' && ruudunTila3 == 'O') || 
            (ruudunTila4 == 'O' && ruudunTila5 == 'O' && ruudunTila6 == 'O') || 
            (ruudunTila7 == 'O' && ruudunTila8 == 'O' && ruudunTila9 == 'O') || 
            (ruudunTila1 == 'O' && ruudunTila4 == 'O' && ruudunTila7 == 'O') ||
            (ruudunTila2 == 'O' && ruudunTila5 == 'O' && ruudunTila8 == 'O') ||
            (ruudunTila3 == 'O' && ruudunTila6 == 'O' && ruudunTila9 == 'O') ||
            (ruudunTila1 == 'O' && ruudunTila5 == 'O' && ruudunTila9 == 'O') ||
            (ruudunTila3 == 'O' && ruudunTila5 == 'O' && ruudunTila7 == 'O')) {
      
      setRatkesikoPeli(true)
      setVoittaja(2)
    }
    else if(ruudunTila1 != '' && ruudunTila2 != '' && ruudunTila3 != '' &&
            ruudunTila4 != '' && ruudunTila5 != '' && ruudunTila6 != '' &&
            ruudunTila7 != '' && ruudunTila8 != '' && ruudunTila9 != '') {
      
      setRatkesikoPeli(true)
      setVoittaja(3)
    }
  }

  const muutaRuudunTilaa1 = () => {
    if(pelaaja == 1 && ruudunTila1 == '' && !ratkesikoPeli) {
      setRuudunTila1('X')
      tarkastaVoitto()
      setPelaaja(2)
      
    }
    else if(ruudunTila1 == '' && !ratkesikoPeli) {
      setRuudunTila1('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa2 = () => {
    if(pelaaja == 1 && ruudunTila2 == '' && !ratkesikoPeli) {
      setRuudunTila2('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila2 == '' && !ratkesikoPeli) {
      setRuudunTila2('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa3 = () => {
    if(pelaaja == 1 && ruudunTila3 == '' && !ratkesikoPeli) {
      setRuudunTila3('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila3 == '' && !ratkesikoPeli) {
      setRuudunTila3('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa4 = () => {
    if(pelaaja == 1 && ruudunTila4 == '' && !ratkesikoPeli) {
      setRuudunTila4('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila4 == '' && !ratkesikoPeli) {
      setRuudunTila4('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa5 = () => {
    if(pelaaja == 1 && ruudunTila5 == '' && !ratkesikoPeli) {
      setRuudunTila5('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila5 == '' && !ratkesikoPeli) {
      setRuudunTila5('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa6 = () => {
    if(pelaaja == 1 && ruudunTila6 == '' && !ratkesikoPeli) {
      setRuudunTila6('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila6 == '' && !ratkesikoPeli) {
      setRuudunTila6('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa7 = () => {
    if(pelaaja == 1 && ruudunTila7 == '' && !ratkesikoPeli) {
      setRuudunTila7('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila7 == '' && !ratkesikoPeli) {
      setRuudunTila7('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa8 = () => {
    if(pelaaja == 1 && ruudunTila8 == '' && !ratkesikoPeli) {
      setRuudunTila8('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila8 == '' && !ratkesikoPeli) {
      setRuudunTila8('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const muutaRuudunTilaa9 = () => {
    if(pelaaja == 1 && ruudunTila9 == '' && !ratkesikoPeli) {
      setRuudunTila9('X')
      tarkastaVoitto()
      setPelaaja(2)
    }
    else if(ruudunTila9 == '' && !ratkesikoPeli) {
      setRuudunTila9('O')
      tarkastaVoitto()
      setPelaaja(1)
    }
  }

  const generoiTeksti = () => {
    if(pelaaja == 1 && !ratkesikoPeli) {
      return <p>Pelaajan 1 vuoro</p>
    }
    else if (pelaaja == 2 && !ratkesikoPeli) {
      return <p>Pelaajan 2 vuoro</p>
    }
    else if(voittaja == 1) {
      return <p>PELAAJA 1 VOITTI!</p>
    }
    else if (voittaja == 2) {
      return <p>PELAAJA 2 VOITTI!</p>
    }
    else {
      return <p>TASAPELI!</p>
    }
  }

  const generoiNappi = () => {
    if(ratkesikoPeli) {
      return <button onClick={resetoiPeli}>Aloita alusta</button>
    }
  }

  const resetoiPeli = () => {
    setRuudunTila1('')
    setRuudunTila2('')
    setRuudunTila3('')
    setRuudunTila4('')
    setRuudunTila5('')
    setRuudunTila6('')
    setRuudunTila7('')
    setRuudunTila8('')
    setRuudunTila9('')
    setPelaaja(1)
    setVoittaja('')
    setRatkesikoPeli(false)
  }

  useEffect(() => {
    tarkastaVoitto()
  });

  return (
    <div>
      <div>
        <div className="rivi">
          <div className="neliö" onClick={muutaRuudunTilaa1}>{ruudunTila1}</div>
          <div className="neliö" onClick={muutaRuudunTilaa2}>{ruudunTila2}</div>
          <div className="neliö" onClick={muutaRuudunTilaa3}>{ruudunTila3}</div>
        </div>
        <div className="rivi">
          <div className="neliö" onClick={muutaRuudunTilaa4}>{ruudunTila4}</div>
          <div className="neliö" onClick={muutaRuudunTilaa5}>{ruudunTila5}</div>
          <div className="neliö" onClick={muutaRuudunTilaa6}>{ruudunTila6}</div>
        </div>
        <div className="rivi">
          <div className="neliö" onClick={muutaRuudunTilaa7}>{ruudunTila7}</div>
          <div className="neliö" onClick={muutaRuudunTilaa8}>{ruudunTila8}</div>
          <div className="neliö" onClick={muutaRuudunTilaa9}>{ruudunTila9}</div>
        </div>
      </div>
      <div>
        <p>{generoiTeksti()}</p>
        <p>{generoiNappi()}</p>
      </div>
    </div>
  );
}

export default App;
