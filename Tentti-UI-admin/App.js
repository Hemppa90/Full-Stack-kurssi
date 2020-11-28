import React from 'react'
import {useState, useEffect} from 'react'
import uuid from 'react-uuid'
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import './App.css';
import Question from './Question'
import AdminQuestion from './AdminQuestion'
import Chart from './Chart'

function App() {

  //STATES

  const [listOfQuestions, setListOfQuestions] = useState
  ([
   [{ question: "What is the circumference of Earth?",
      answer1:{ answer: "42300 km",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "40075 km",
                user_choice: false,
                correctness: true
              },
      answer3:{ answer: "38560 km",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "44075 km",
                user_choice: false,
                correctness: false
              },
      answer5:{ answer: "41075 km",
                user_choice: false,
                correctness: false
              }
    },
    { question: "Who was the third president of the United States of America?",
      answer1:{ answer: "Martin Van Buren",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "Franklin Pierce",
                user_choice: false,
                correctness: false
              },
      answer3:{ answer: "Ulysses S. Grant",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "Thomas Jefferson",
                user_choice: false,
                correctness: true
              },
      answer5:{ answer: "John Quincy Adams",
                user_choice: false,
                correctness: false
              }
    },
    { question: "Which country invited gin?",
      answer1:{ answer: "England",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "Austria",
                user_choice: false,
                correctness: false
              },
      answer3:{ answer: "Switzerland",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "Holland",
                user_choice: false,
                correctness: true
              },
      answer5:{ answer: "Germany",
                user_choice: false,
                correctness: false
              }
    },
    { question: "What does a Geiger Counter measure?",
      answer1:{ answer: "Seismic activity",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "Voltage",
                user_choice: false,
                correctness: false
              },
      answer3:{ answer: "Radiation",
                user_choice: false,
                correctness: true
              },
      answer4:{ answer: "Gravitational waves",
                user_choice: false,
                correctness: false
              },
      answer5:{ answer: "Air humidity",
                user_choice: false,
                correctness: false
              }
    }],

   [{ question: "What is Donald Trump's wife's firstname?",
      answer1:{ answer: "Lisa",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "Laura",
                user_choice: false,
                correctness: false
              },
      answer3:{ answer: "Catherine",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "Melania",
                user_choice: false,
                correctness: true
              },
      answer5:{ answer: "Angela",
                user_choice: false,
                correctness: false
              }
    },
    { question: "How many people has walked the surface of the Moon?",
      answer1:{ answer: "12",
                user_choice: false,
                correctness: true
              },
      answer2:{ answer: "10",
                user_choice: false,
                correctness: false
              },
      answer3:{ answer: "9",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "7",
                user_choice: false,
                correctness: false
              },
      answer5:{ answer: "6",
                user_choice: false,
                correctness: false
              }
    },
    { question: "What is the third heaviest weight class called in the mixed martial arts organization UFC?",
      answer1:{ answer: "Bantamweight",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "Middleweight",
                user_choice: false,
                correctness: true
              },
      answer3:{ answer: "Welterweight",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "Heavyweight",
                user_choice: false,
                correctness: false
              },
      answer5:{ answer: "Light-Heavyweight",
                user_choice: false,
                correctness: false
              }
    },
    { question: "Which country has the most Nobel Prize winners?",
      answer1:{ answer: "USA",
                user_choice: false,
                correctness: false
              },
      answer2:{ answer: "Belgium",
                user_choice: false,
                correctness: false
              },
      answer3:{ answer: "UK",
                user_choice: false,
                correctness: false
              },
      answer4:{ answer: "Italy",
                user_choice: false,
                correctness: false
              },
      answer5:{ answer: "France",
                user_choice: false,
                correctness: true
              }
    }]
  ])

  const [isDataInitialized, setIsDataInitialized] = useState(false)
  const [isSwappingView, setIsSwappingView] = useState('')
  const [menuChoice, setMenuChoice] = useState('')
  const [showAnswers, setShowAnswers] = useState(false)
  const [examScore, setExamScore] = useState(0)

  //FUNCTIONS

  const generateView = (menu_choice) => {

    let exam_num = (menu_choice.charAt(menu_choice.length-1))-1
    let rand = (Math.floor(Math.random()*10))

    if(menu_choice != "admin" && menu_choice != '') {
      setTimeout(() => {setIsSwappingView(false)}, rand*500)
      if(!isSwappingView) {
        return generateExam(listOfQuestions[exam_num], exam_num)
      }
    }
    else {
      setTimeout(() => {setIsSwappingView(false)}, rand*500)
      if(!isSwappingView) {
        return generateAdminView(listOfQuestions)
      }
    }

  }

  const generateExam = (exam, exam_num) => {
    let questions_list = []

    for(let i = 0; i < exam.length; i++) {
      questions_list.push(<Question 
                            questions={listOfQuestions}
                            updateListOfQuestions={updateListOfQuestions}
                            exam_index={exam_num}
                            question_index={i}
                            answers={showAnswers}
                            addToExamScore={addToExamScore}
                            subtractFromExamScore={subtractFromExamScore}
                          />)
    }
    
    questions_list.push(<Button id="näytä_vastaukset_button" onClick={() => {toggleAnswers()}}>NÄYTÄ VASTAUKSET</Button>)
    return questions_list
  }

  const generateAdminView = (list_of_questions) => {
    let exam_panes = []

    for(var exam_iterator = 0; exam_iterator < list_of_questions.length; exam_iterator++) {
      exam_panes.push(<Paper id="paper">
                      <DeleteIcon 
                        id="exam_delete_icon" 
                        onClick={() => {deleteExam(listOfQuestions, exam_iterator)}}
                      />
                      {generateAdminQuestions(listOfQuestions[exam_iterator], exam_iterator)}
                      </Paper>)

      
    }
    exam_panes.push(<div><AddCircleIcon onClick={() => {addExam(listOfQuestions, exam_iterator)}} id="exam_add_icon"/></div>)
    return exam_panes
  }

  const generateAdminQuestions = (questions, exam_index) => {
    let question_panes = []

    for(let question_iterator = 0; question_iterator < questions.length; question_iterator++) {
      question_panes.push(<AdminQuestion 
                            question={questions[question_iterator]}
                            listOfQuestions={listOfQuestions}
                            updateListOfQuestions={updateListOfQuestions}
                            exam_index={exam_index}
                            question_index={question_iterator}
                          />)
    }

    question_panes.push(<AddCircleIcon id="question_add_icon" onClick={() => {addQuestion(listOfQuestions, exam_index)}}/>)

    return question_panes

  }

  const addExam = (list_of_questions, exam_index) => {
    let list_of_questions_copy = [...list_of_questions]
    list_of_questions_copy.splice(exam_index + 1, 0, new Array(new Object()))
    setListOfQuestions(list_of_questions_copy)
  }

  const deleteExam = (list_of_questions, exam_index) => {
    let list_of_questions_copy = [...list_of_questions]
    let filtered = list_of_questions_copy.filter(item => item != list_of_questions_copy[exam_index])
    setListOfQuestions(filtered)
  }

  const addQuestion = (list_of_questions, exam_index) => {
    let list_of_questions_copy = [...list_of_questions]

    let new_question = new Object()
    new_question.question = ""

    list_of_questions_copy[exam_index].push(new_question)
    setListOfQuestions(list_of_questions_copy)
  }

  const updateListOfQuestions = (list_of_questions) => {
    setListOfQuestions(list_of_questions)
  }

  const generateMenuButtons = (list_of_questions) => {
    let button_list = []

    for(let i = 0; i < listOfQuestions.length; i++) {
      let menu_choice = "tentti" + (i + 1)
      button_list.push(<Button id="tentti_button" onClick={() => {setMenuChoice(menu_choice);setIsSwappingView(true)}}>Tentti {i+1}</Button>)
    }

    button_list.push(<Button id="admin_button" onClick={() => {setMenuChoice("admin");setIsSwappingView(true)}}>ADMIN</Button>)
    return button_list
  }

  const toggleAnswers = () => {
    if(showAnswers == false) {
      setShowAnswers(true)
      setIsSwappingView(true)
    }
    else {
      setShowAnswers(false)
      setIsSwappingView(true)
    }
  }

  const addToExamScore = () => {
    setExamScore(examScore + 1)
  }

  const subtractFromExamScore = () => {
    setExamScore(examScore - 1)
  }

  const showSelma = () => {
    if(isSwappingView == true) {
      return <img id="selma_koira" src="selma_koira.png" visibility="hidden" width="50" height="50" />
    }
  }

  /*const fetchData = async () => {
    try {
      
      let result = await axios.get("http://localhost:4000/1")
      console.log(result)

      if(result.data.length > 0) {
        return result
      }
      else {
        throw ("Ongelma datan haussa! Koko on <= 0")
      }
    }
    catch (exception) {
      throw (exception)
    }
  }*/

  useEffect(() => {
  
    let temp_data = JSON.parse(window.localStorage.getItem("data"))
    
    if(temp_data == null) {
      window.localStorage.setItem("data", JSON.stringify(listOfQuestions))
      temp_data = listOfQuestions
    }
  
    setListOfQuestions(temp_data)
    setIsDataInitialized(true)
  
  }, [])
  
  useEffect(() => {
    
    //fetchData()
    if(isDataInitialized) {
      window.localStorage.setItem("data", JSON.stringify(listOfQuestions))
    }
  
  }, [listOfQuestions])

  //JSX
  return (
    <div>
      <div className="banner">
        <Button id="tentit_button">TENTIT</Button>
        <Button id="tietoaSovelluksesta_button" href="https://www.youtube.com/watch?v=sAqnNWUD79Q">TIETOA SOVELLUKSESTA</Button>
        <Button id="poistu_button">POISTU</Button>
      </div>
      <div className="exams_menu">
        {generateMenuButtons(listOfQuestions)}
        {examScore}
      </div>
      <div>
        {showSelma()}
        {generateView(menuChoice)}
      </div>
    </div>
  )
}

export default App;
