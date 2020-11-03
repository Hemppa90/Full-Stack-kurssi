import React from 'react'
import {useState, useEffect} from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './App.css';

//TENTTI-UI
function App() {

//STATES
const [questions, setQuestions] = useState(
  [{question: "What is the circumference of Earth?",
    answer1: ["42300 km", false, false],
    answer2: ["40075 km", false, true],
    answer3: ["38560 km", false, false],
    answer4: ["44075 km", false, false]
  },
  {question: "Who was the third president of the United States of America?",
    answer1: ["Martin Van Buren", false, false],
    answer2: ["Franklin Pierce", false, false],
    answer3: ["Ulysses S. Grant", false, false],
    answer4: ["Thomas Jefferson", false, true],
    answer5: ["John Quincy Adams", false, false]
  },
  {question: "Which country invited gin?",
    answer1: ["England", false, false],
    answer2: ["Austria", false, false],
    answer3: ["Switzerland", false, false],
    answer4: ["Holland", false, true]
  },
  {question: "What does a Geiger Counter measure?",
    answer1: ["Seismic activity", false, false],
    answer2: ["Voltage", false, false],
    answer3: ["Radiation", false, true],
    answer4: ["Gravitational waves", false, false]
  }])

const [data, setData] = useState([])
const [isDataInitialized, setIsDataInitialized] = useState(false)
const [answers, setAnswers] = useState(false)


//FUNCTIONS
const generateQuizboard = (questions) => {
  let questions_amount_list = []

  for(var i = 0; i < questions.length; i++) {
    questions_amount_list.push(<div className="question_table">{generateQuestions(questions[i], Object.values(questions[i]).length-1)}</div>)
  }
  return questions_amount_list
}

const generateQuestions = (questions, amount) => {
  let question = questions
  let length = amount
  let question_list = []

  for(var i = 0; i <= length; i++) {

    if(i == 0) {
      question_list.push(<div>{Object.values(question)[i]}</div>)
      continue
    }

    let data_question = Object.values(question)[i]
    let index = i

    if(answers == false) {
      question_list.push(<div className="question_content"><Checkbox color='default' onChange={(event) => checked(event, question, index)}/><p>{data_question}</p></div>)
    }
    else if (answers == false && data_question.[1] == true) {
      question_list.push(<div className="question_content"><Checkbox color='default' checked="true" onChange={(event) => checked(event, question, index)}/><p>{data_question}</p></div>)
    }
    else if (data_question.[2] == true){
      question_list.push(<div className="question_content"><Checkbox/><Checkbox checked="true"/><p>{data_question}</p></div>)
    }
    else {
      question_list.push(<div className="question_content"><Checkbox/><Checkbox/><p>{data_question}</p></div>)
    }

  }
  return question_list
}

const checked = (event, question, index) => {
  let answer_array = question
  Object.values(answer_array)[index].[1] = event.target.checked
  let json_object = JSON.parse(JSON.stringify(questions))
  setQuestions(json_object)
  //console.log(json_object)
  //console.log(Object.values(answer_array)[index])
}

const showAnswers = () => {
  if(answers == false) {
    setAnswers(true)
  }
  else {
    setAnswers(false)
  }
}

useEffect(() => {

  let temp_data = JSON.parse(window.localStorage.getItem("data"))

  if(temp_data == null) {
    window.localStorage.setItem("data", JSON.stringify(questions))
    temp_data = questions
  }
  
  setData(temp_data)
  setIsDataInitialized(true)

}, [questions])

useEffect(() => {

  if(isDataInitialized) {
    window.localStorage.setItem("data", JSON.stringify(data))
  }

}, [questions])


//JSX
  return (
    <div>
      <div className="banner">
        <Button id="tentit_button">TENTIT</Button>
        <Button id="tietoaSovelluksesta_button" href="https://www.youtube.com/watch?v=sAqnNWUD79Q">TIETOA SOVELLUKSESTA</Button>
        <Button id="poistu_button">POISTU</Button>
      </div>
      <div>
        <Button id="javascriptin_perusteet_button">JAVASCRIPTIN PERUSTEET</Button>
      </div>
      <div className="container">
        {generateQuizboard(questions)}
        <Button id="näytä_vastaukset_button" onClick={() => showAnswers()}>NÄYTÄ VASTAUKSET</Button>
      </div>
    </div>
  );
}

export default App;
