import React from 'react'
import {useState, useEffect} from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './App.css';

//TENTTI-UI
function App() {

//KOMMENTTIA KOODISTA: Checkboxit ei ole vielä loppuun asti hiottu. Material-ui checkboxien kanssa tuli ongelmia siinä, että ne
//eivät näyttäneet checked-tilaa sivua uudelleen ladattaessa (F5). Tein siis testausta varten purkkaviritelmän html checkboxeilla.

//STATES
const [questions, setQuestions] = useState(
  [{question: "What is the circumference of Earth?",
    answer1: ["42300 km", false, false],
    answer2: ["40075 km", false, true],
    answer3: ["38560 km", false, false],
    answer4: ["44075 km", false, false],
    answer5: ["41075 km", false, false]
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
    answer4: ["Holland", false, true],
    answer5: ["Germany", false, false]
  },
  {question: "What does a Geiger Counter measure?",
    answer1: ["Seismic activity", false, false],
    answer2: ["Voltage", false, false],
    answer3: ["Radiation", false, true],
    answer4: ["Gravitational waves", false, false],
    answer5: ["Air humidity", false, false]
  }])

const [questions2, setQuestions2] = useState(
  [{question: "What is Donald Trump's wife's firstname?",
    answer1: ["Lisa", false, false],
    answer2: ["Laura", false, false],
    answer3: ["Catherine", false, false],
    answer4: ["Melania", false, true],
    answer5: ["Angela", false, false]
  },
  {question: "How many people has walked the surface of the Moon?",
    answer1: ["12", false, true],
    answer2: ["10", false, false],
    answer3: ["9", false, false],
    answer4: ["7", false, false],
    answer5: ["6", false, false]
  },
  {question: "What is the third heaviest weight class called in the mixed martial arts organization UFC?",
    answer1: ["Bantamweight", false, false],
    answer2: ["Middleweight", false, true],
    answer3: ["Welterweight", false, false],
    answer4: ["Heavyweight", false, false],
    answer5: ["Light-Heavyweight", false, false]
  },
  {question: "Which country has the most Nobel Prize winners?",
    answer1: ["USA", false, false],
    answer2: ["Belgium", false, false],
    answer3: ["UK", false, false],
    answer4: ["Italy", false, false],
    answer5: ["France", false, true]
  }])

const [isDataInitialized, setIsDataInitialized] = useState(false)
const [answers, setAnswers] = useState(false)
const [exam, setExam] = useState('')
const [isSwappingView, setIsSwappingView] = useState('')


//FUNCTIONS
const openExams = (value) => {

  let rand = (Math.floor(Math.random()*10))
  if(value == "javascript") {
    setTimeout(() => {setIsSwappingView(false)}, rand*1000)
    if(!isSwappingView) {
      return generateQuizboard(questions)
    }
  }
  else if(value == "haskellin perusteet"){
    setTimeout(() => {setIsSwappingView(false)}, rand*1000)
    if(!isSwappingView) {
      return generateQuizboard(questions2)
    }
  }
}

const showSelma = () => {
  if(isSwappingView == true) {
    return <img id="selma_koira" src="selma_koira.png" visibility="hidden" width="50" height="50" />
  }
}

const generateQuizboard = (questions) => {
  let questions_amount_list = []

  for(var i = 0; i < questions.length; i++) {
    questions_amount_list.push(<div className="question_table">{generateQuestions(questions[i], Object.values(questions[i]).length-1)}</div>)
  }
  questions_amount_list.push(<Button id="näytä_vastaukset_button" onClick={() => showAnswers()}>NÄYTÄ VASTAUKSET</Button>)
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

    if(answers == false && data_question.[1] == true) {
      question_list.push(<div className="question_content"><input className="checkbox" type="checkbox" onChange={(event) => checked(event, question, index)} checked/><p>{data_question}</p></div>)
    }
    else if (answers == false) {
      question_list.push(<div className="question_content"><Checkbox onChange={(event) => checked(event, question, index)}/><p>{data_question}</p></div>)
    }
    else if (data_question.[1] == true && data_question.[2] == true){
      question_list.push(<div className="question_content"><Checkbox checked={true} disabled={true}/><Checkbox checked={true}/><p>{data_question}</p></div>)
    }
    else if (data_question.[1] == true){
      question_list.push(<div className="question_content"><Checkbox checked={true} disabled={true}/><Checkbox/><p>{data_question}</p></div>)
    }
    else if (data_question.[2] == true){
      question_list.push(<div className="question_content"><Checkbox disabled={true}/><Checkbox checked={true}/><p>{data_question}</p></div>)
    }
    else {
      question_list.push(<div className="question_content"><Checkbox disabled={true}/><Checkbox/><p>{data_question}</p></div>)
    }
  }
  return question_list
}

const checked = (event, question, index) => {
  let answer_array = question
  Object.values(answer_array)[index].[1] = event.target.checked
  let json_object = JSON.parse(JSON.stringify(questions))
  setQuestions(json_object)
  console.log(questions)
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
  let temp_data2 = JSON.parse(window.localStorage.getItem("data2"))

  if(temp_data == null || temp_data2 == null) {
    window.localStorage.setItem("data", JSON.stringify(questions))
    window.localStorage.setItem("data2", JSON.stringify(questions2))
    temp_data = questions
    temp_data2 = questions2
  }

  setQuestions(temp_data)
  setQuestions2(temp_data2)
  setIsDataInitialized(true)
}, [])

useEffect(() => {

  if(isDataInitialized) {
    window.localStorage.setItem("data", JSON.stringify(questions))
    window.localStorage.setItem("data2", JSON.stringify(questions2))
  }

}, [questions])


//JSX
  return (
    <div>
      <div className="banner">
        <Button id="tentit_button">TENTIT</Button>
        <Button id="tietoaSovelluksesta_button" href="https://www.youtube.com/watch?v=sAqnNWUD79Q">TIETOA SOVELLUKSESTA</Button>
        <div className="poistu_div">
          <Button id="poistu_button">POISTU</Button>
        </div>
      </div>
      <div className="exam_button_container">
        <Button id="javascriptin_perusteet_button" onClick={() => {setExam("haskellin perusteet");setIsSwappingView(true)}}>HASKELLIN PERUSTEET</Button>
        <Button id="javascriptin_perusteet_button" onClick={() => {setExam("javascript");setIsSwappingView(true)}}>JAVASCRIPTIN PERUSTEET</Button>
      </div>
      <div className="container">
        {showSelma()}
        {openExams(exam)}
      </div>
    </div>
  );
}

export default App;
