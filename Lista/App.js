import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import './App.css';

function App() {

  const [list1, setList1] = useState(["Matti", "Jaakko", "Liisa", "Olli", "Juuso", "Ossi"])
  const [list2, setList2] = useState(["Ari", "Pekka", "Milla", "Raisa", "Riina", "Pasi"])
  const [list1Copy, setList1Copy] = useState(list1)
  const [list2Copy, setList2Copy] = useState(list2)
  const [selected, setSelected] = useState('')
  const [isList1Sorted, setIsList1Sorted] = useState('')
  const [isList2Sorted, setIsList2Sorted] = useState('')
  const [isFoundFromLeft, setIsFoundFromLeft] = useState('')

  
  const generateList1 = () => {
    let newListInstance
    return (list1.length == 0 ? <div>This list has no items.</div> : 
                                newListInstance = list1.map((item, index) => <div className="listItem" onClick={itemClicked(index)}>{item}</div>))
  }

  const generateList2 = () => {
    let newListInstance
    return (list2.length == 0 ? <div>This list has no items.</div> : 
                                newListInstance = list2.map((item, index) => <div className="listItem" onClick={itemClicked(index+list1.length)}>{item}</div>))
  }

  const itemClicked = (index) => () => {
    setSelected(index)
  }

  const arrowRightClicked = (selected) => () => {

    if(selected !== '') {
      if(list1.[selected] != undefined) {
        let filtered = list1.filter(item => item !== list1[selected])
        let listCopy = [...list2]
        listCopy.push(list1[selected])
        setList1(filtered)
        setList2(listCopy)
        setSelected('')
      }
    }
  }

  const arrowLeftClicked = (selected) => () => {
    
    if(selected !== '') {
      if(list2.[selected-list1.length] != undefined) {
        let filtered = list2.filter(item => item !== list2.[selected-list1.length])
        let listCopy = [...list1]
        listCopy.push(list2[selected-list1.length])
        setList2(filtered)
        setList1(listCopy)
        setSelected('')
      }
    }
  }

  const sortList1 = () => {
    if(isList1Sorted != true) {
      let listCopy = [...list1]
      listCopy.sort()
      setList1(listCopy)
      setIsList1Sorted(true)
    }
    else {
      let listCopy = [...list1]
      listCopy.reverse()
      setList1(listCopy)
      setIsList1Sorted(false)
    }
  }

  const sortList2 = () => {
    if(isList2Sorted != true) {
      let listCopy = [...list2]
      listCopy.sort()
      setList2(listCopy)
      setIsList2Sorted(true)
    }
    else {
      let listCopy = [...list2]
      listCopy.reverse()
      setList2(listCopy)
      setIsList2Sorted(false)
    }
  }

  //FILTTERÖINTI TEHTÄVÄÄN PÄÄSTIIN JA SE JÄI VIELÄ KESKEN
  const filterList1ByInput = (event) => {
    let listCopy = list1.filter(item => item.match(event.target.value))
    setList1(listCopy)
    
    //console.log(event.target.value)
    //console.log("Muutos tapahtui!")
  }

  const resetValues = () => {
    setList1(list1Copy)
    setList2(list2Copy)
    setSelected('')
    setIsList1Sorted('')
    setIsList2Sorted('')
    setIsFoundFromLeft('')
  }
  
  return (
    <div>
      <div className="wrapper">
        <div className="list">
          <div>
            <SortByAlphaIcon className="listItem" onClick={sortList1}></SortByAlphaIcon>
            {generateList1()}
          </div>
        </div>
        <div className="arrowbox">
          <ArrowForwardIcon id="arrowRight" onClick={arrowRightClicked(selected)}></ArrowForwardIcon>
          <ArrowBackIcon id="arrowLeft" onClick={arrowLeftClicked(selected)}></ArrowBackIcon>
        </div>
        <div className="list">
          <div>
            <SortByAlphaIcon className="listItem" onClick={sortList2}></SortByAlphaIcon>
            {generateList2()}
          </div>
        </div>
      </div>
      <div className="wrapper">
        <input id="input" onChange={(event) => filterList1ByInput(event)} placeholder="Filter"></input>
        <input id="input" placeholder="Filter"></input>
        <button onClick={resetValues}>Reset Values</button>
      </div>
    </div>
  );
}

export default App;
