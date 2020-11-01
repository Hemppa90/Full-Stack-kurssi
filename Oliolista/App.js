import React from 'react';
import {useState} from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

//Toiminnallisuudet toteutettu tehtävistä kohtaan 1.3 asti.

function App() {

  //STATES------------------------------------------------------

  const [list1, setList1] = useState([
    { firstName: "Matti", lastName: "Honkanen", age: 37
    },
    { firstName: "Jaakko", lastName: "Kangasmäki", age: 21
    }, 
    { firstName: "Liisa", lastName: "Järvelä", age: 45
    },
    { firstName: "Lauri", lastName: "Harakka", age: 33
    },
    { firstName: "Jani", lastName: "Salo", age: 25
    },
    { firstName: "Olli", lastName: "Kaipainen", age: 16
    }])

  const [list2, setList2] = useState([
    { firstName: "Ari", lastName: "Juvonen", age: 41
    },
    { firstName: "Pekka", lastName: "Heikkilä", age: 21
    }, 
    { firstName: "Milla", lastName: "Viitala", age: 29
    },
    { firstName: "Laura", lastName: "Saarinen", age: 52
    },
    { firstName: "Erik", lastName: "Lahti", age: 47
    },
    { firstName: "Raisa", lastName: "Hurme", age: 68
    }])
  
  //Arrow1 on nuolen oikealle tila, arrow2 on nuolen vasemmalle tila.
  //Nuolet siirtävät vain, kun niiden tila true.
  const [list1BackUp, setList1BackUp] = useState(list1)
  const [list2BackUp, setList2BackUp] = useState(list2)
  const [arrow1, setArrow1] = useState('')
  const [arrow2, setArrow2] = useState('')
  const [selected, setSelected] = useState('')
  const [isList1Sorted, setIsList1Sorted] = useState('')
  const [isList2Sorted, setIsList2Sorted] = useState('')
  const [input1, setInput1] = useState(0)
  const [input2, setInput2] = useState('')
  

  //FUNCTIONS---------------------------------------------------
  
  const generateTable = (list) => {



    if(list.length != 0) {
      return (
        <table className="myTable">
          <tr>
            {generateSortButtons(list)}
          </tr>
          <tr>
            <td className="header">Firstname</td>
            <td className="header">Lastname</td>
            <td className="header">Age</td>
          </tr>
            {generateRows(list)}
        </table>
      );
    }
    else {
      return <div>This list has no items.</div>
    }
  }

  const generateSortButtons = (list) => {
    let buttons_list = []

    if(list == list1) {
      for(let i = 0; i < 3; i++) {
        buttons_list.push(<td className="sort_button" onClick={() => sortButtonPressed(i)}>Sort</td>)
      }
      return buttons_list
    }
    else {
      for(let i = 3; i < 6; i++) {
        buttons_list.push(<td className="sort_button" onClick={() => sortButtonPressed(i)}>Sort</td>)
      }
      return buttons_list
    }
  }

  const sortButtonPressed = (i) => {
    
    let listCopy = [...list1]
    let listCopy2 = [...list2]
    switch(i) {
      case 0:
        if(isList1Sorted != true) {
          listCopy.sort((a,b) => a.firstName.localeCompare(b.firstName))
          setList1(listCopy)
          setIsList1Sorted(true)
        }
        else {
          listCopy.sort((a,b) => b.firstName.localeCompare(a.firstName))
          setList1(listCopy)
          setIsList1Sorted(false)
        }
        break;
      case 1:
        if(isList1Sorted != true) {
          listCopy.sort((a,b) => a.lastName.localeCompare(b.lastName))
          setList1(listCopy)
          setIsList1Sorted(true)
        }
        else {
          listCopy.sort((a,b) => b.lastName.localeCompare(a.lastName))
          setList1(listCopy)
          setIsList1Sorted(false)
        }
        break;
      case 2:
        if(isList1Sorted != true) {
          listCopy.sort((a,b) => a.age - b.age)
          setList1(listCopy)
          setIsList1Sorted(true)
        }
        else {
          listCopy.sort((a,b) => a.age + b.age)
          setList1(listCopy)
          setIsList1Sorted(false)
        }
        break;
      case 3:
        if(isList2Sorted != true) {
          listCopy2.sort((a,b) => a.firstName.localeCompare(b.firstName))
          setList2(listCopy2)
          setIsList2Sorted(true)
        }
        else {
          listCopy2.sort((a,b) => b.firstName.localeCompare(a.firstName))
          setList2(listCopy2)
          setIsList2Sorted(false)
        }
        break;
      case 4:
        if(isList2Sorted != true) {
          listCopy2.sort((a,b) => a.lastName.localeCompare(b.lastName))
          setList2(listCopy2)
          setIsList2Sorted(true)
        }
        else {
          listCopy2.sort((a,b) => b.lastName.localeCompare(a.lastName))
          setList2(listCopy2)
          setIsList2Sorted(false)
        }
        break;
      case 5:
        if(isList2Sorted != true) {
          listCopy2.sort((a,b) => a.age - b.age)
          setList2(listCopy2)
          setIsList2Sorted(true)
        }
        else {
          listCopy2.sort((a,b) => a.age + b.age)
          setList2(listCopy2)
          setIsList2Sorted(false)
        }
        break;
      default:
    }
  }

  const generateRows = (list) => {
    const row_count = list.length
    let row_list = []

    if(list != list2) {
      for(var i = 0; i < row_count; i++) {
        row_list.push(<tr className="table_row" onClick={itemClicked(i)}>{generateData(list, i)}</tr>)
      }
      return row_list
    }
    else {
      for(var i = 0; i < row_count; i++) {
        row_list.push(<tr className="table_row" onClick={itemClicked(i+list1.length)}>{generateData(list, i)}</tr>)
      }
      return row_list
    }
  }

  const generateData = (list, index) => {
    let values = [list[index].firstName, list[index].lastName, list[index].age]

    return(
      (values.map(item => <td className="table_data">{item}</td>))
    );
  }

  const itemClicked = (index) => () => {
    setSelected(index)

    if(index < list1.length) { 
      setArrow1(true)
      setArrow2(false)
    }
    else {
      setArrow2(true)
      setArrow1(false)
    }
  }

  const arrowClicked = (selected, arrow) => () => {

    if(selected !== '' && (arrow1 == arrow && arrow1 == true)) {
      let list1Copy = [...list1]
      let list2Copy = [...list2]
      let filtered_object = list1Copy.filter(item => item == list1[selected])
      let filtered_list = list1Copy.filter(item => item != list1[selected])

      let obj = new Object()
      obj.firstName = Object.values(filtered_object[0].firstName).join("")
      obj.lastName = Object.values(filtered_object[0].lastName).join("")
      obj.age = filtered_object[0].age

      list2Copy.push(obj)
      setList1(filtered_list)
      setList2(list2Copy)
      setArrow1('')
    }
    else if (selected !== '' && (arrow2 == arrow && arrow2 == true)) {
      let list1Copy = [...list1]
      let list2Copy = [...list2]
      let filtered_object = list2Copy.filter(item => item == list2[selected-list1.length])
      let filtered_list = list2Copy.filter(item => item != list2[selected-list1.length])

      let obj = new Object()
      obj.firstName = Object.values(filtered_object[0].firstName).join("")
      obj.lastName = Object.values(filtered_object[0].lastName).join("")
      obj.age = filtered_object[0].age

      list1Copy.push(obj)
      setList2(filtered_list)
      setList1(list1Copy)
      setArrow2('')
    }
  }

  const filterByAge = (list) => {
    let list1Copy = [...list1BackUp]
    let list2Copy = [...list2BackUp]
    setList1(list1BackUp)
    setList2(list2BackUp)

    if(list == list1 && input1 != '') {
      let filtered = list1Copy.filter(item => item.age == input1)
      list1Copy = filtered
      setList1(list1Copy)
    }
    else {
      setList1(list1BackUp)
    }

    if(list == list2 && input2 != '') {
      let filtered = list2Copy.filter(item => item.age == input2)
      list2Copy = filtered
      setList2(list2Copy)
    }
    else {
      setList2(list2BackUp)
    }
  }

  //JSX---------------------------------------------------------

  return (
    <div>
      <div className="container">
        <div className="table_wrapper">
          {generateTable(list1)}
        </div>
        <div className="arrowbox">
          <ArrowForwardIcon className="arrow" onClick={arrowClicked(selected, arrow1)}></ArrowForwardIcon>
          <ArrowBackIcon className="arrow" onClick={arrowClicked(selected, arrow2)}></ArrowBackIcon>
        </div>
        <div className="table_wrapper">
          {generateTable(list2)}
        </div>
      </div>
      <div className="container">
        <div className="container2">
          <TextField className="list1_input" onChange={(event) => (setInput1(event.target.value))} placeholder="Filter by age"></TextField>
          <Button variant="contained" color="primary" className="filterButton1" onClick={() => filterByAge(list1)}>Filter</Button>
        </div>
        <div className="container3">
          <TextField className="list2_input" onChange={(event) => (setInput2(event.target.value))} placeholder="Filter by age"></TextField>
          <Button variant="contained" color="primary" className="filterButton2" onClick={() => filterByAge(list2)}>Filter</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
