import React, {useState, useEffect, useMemo} from 'react'

//En äkkiseltään keksinyt kuinka olisin järkevästi implementoinut tämän hookin
//tenttikäyttöliittymääni, mutta tein sen sijaan tällaisen yksinkertaisen useMemo-
//harjoituksen, jossa havainnollistan sen toimintaa.

//Tässä harjoitussovelluksessa renderöidään kahta tilaa: tarpeettoman raskasta
//slow-funktiota ja väriteeman säätöä themeStylesillä. UseMemolla mahdollistetaan
//teeman värin vaihtaminen ilman, että slow-funktiota joudutaan joka kerta
//väriä vaihdettaessa kutsumaan.

const slowFunction = (number) => {
  console.log("Slow function call under way...")
  for(let i = 0; i < 1000000000; i++) {}
  return number * 2
}

function App() {

  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)

  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [dark])

  useEffect(() => {
    console.log('Color theme changed')
  }, [themeStyles])

  return (
    <div>
      <input type="number" value={number} onChange={(event) => setNumber(parseInt(event.target.value))}/>
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  )
}

export default App;
