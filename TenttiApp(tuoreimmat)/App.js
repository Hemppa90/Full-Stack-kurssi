import React, {useState, useEffect} from 'react'
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
import OpenLogin from './Login'

function App() {

  //STATES
  const [isLogin, setIsLogin] = useState(false)

  const [listOfQuestions, setListOfQuestions] = useState([])
  const [listOfExamIDs, setListOfExamIDs] = useState([])
  const [listOfQuestionIDs, setListOfQuestionIDs] = useState([])
  const [listOfAnswerIDs, setListOfAnswerIDs] = useState([])

  const [examNames, setExamNames] = useState([])
  const [questionNames, setQuestionNames] = useState([])
  const [answerNames, setAnswerNames] = useState([])

  const [examName, setExamName] = useState('')
  const [isSwappingView, setIsSwappingView] = useState('')
  const [menuChoice, setMenuChoice] = useState('')
  const [showAnswers, setShowAnswers] = useState(false)
  const [examScore, setExamScore] = useState(0)

  //Purkkaviritelmä testaukseen
  const [sideEffect, setSideEffect] = useState(0)


  //FUNCTIONS

  const generateMenuButtons = (list_of_questions, exam_names) => {
    let button_list = []

    for(let i = 0; i < list_of_questions.length; i++) {
      let menu_choice = "Tentti" + (i + 1)

      button_list.push(<Button id="tentti_button" onClick={() => {setMenuChoice(menu_choice);setIsSwappingView(true)}}>{exam_names[i]}</Button>)

      if(exam_names[i + 1] != undefined) {
        button_list.push(<span id="tentti_button">  |  </span>)
      }
    }
    
    return button_list
  }

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

    for(let question_iterator = 0; question_iterator < exam.length; question_iterator++) {
      questions_list.push(<Question 
                            questions={listOfQuestions}
                            updateListOfQuestions={updateListOfQuestions}
                            exam_index={exam_num}
                            question_index={question_iterator}
                            answers={showAnswers}
                            addToExamScore={addToExamScore}
                            subtractFromExamScore={subtractFromExamScore}
                            listOfQuestionIDs={listOfQuestionIDs}
                            listOfAnswerIDs={listOfAnswerIDs}
                            answerNames={answerNames}
                            sideEffect={sideEffect}
                            triggerSideEffect={triggerSideEffect}
                          />)
    }
    
    questions_list.push(<Button id="näytä_vastaukset_button" onClick={() => {toggleAnswers()}}>NÄYTÄ VASTAUKSET</Button>)
    return questions_list
  }

  const generateAdminView = (list_of_questions) => {
    let exam_panes = []

    for(let exam_iterator = 0; exam_iterator < list_of_questions.length; exam_iterator++) {
      
      exam_panes.push(<Paper id="paper">
                      <DeleteIcon 
                        id="exam_delete_icon" 
                        onClick={() => {deleteExam(exam_iterator)}}
                      />
                      <span id="exam_name_span">{"Exam: " + examNames[exam_iterator]}</span>
                      <div id="change_exam_name_div">
                        <TextField 
                          id="change_exam_name_textfield" 
                          variant="outlined" 
                          size="small" 
                          style={{width: 750}} 
                          placeholder="Change exam name..."
                          onChange={(event) => {updateExamName(event, listOfExamIDs[exam_iterator])}}
                        />
                      </div>
                      {generateAdminQuestions(listOfQuestions[exam_iterator], exam_iterator)}
                      </Paper>)
    }

    exam_panes.push(<Paper id="paper">
                    <TextField 
                      variant="outlined" 
                      size="small" 
                      style={{width: 650}}
                      placeholder="Insert new exam name..."
                      onBlur={(event) => {setExamName(event.target.value)}}
                    />
                    <div><AddCircleIcon onClick={() => {addExam(examName)}} id="exam_add_icon"/></div>
                    </Paper>)
    
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
                            listOfQuestionIDs={listOfQuestionIDs}
                            listOfAnswerIDs={listOfAnswerIDs}
                            answerNames={answerNames}
                            sideEffect={sideEffect}
                            triggerSideEffect={triggerSideEffect}
                            questionNames={questionNames}
                          />)
    }

    question_panes.push(<AddCircleIcon id="question_add_icon" onClick={() => {addQuestion(listOfExamIDs[exam_index])}}/>)
    return question_panes

  }

  const addExam = async (exam_name) => {
    let id = uuid()

    let exam_names_copy = examNames
    exam_names_copy.push(exam_name)
    setExamNames(exam_names_copy)
    
    try {
      await axios.post(`http://localhost:4000/exams/${id}/${exam_name}`)
    }
    catch(exception) {
      throw exception
    }
    
    setSideEffect(sideEffect + 1)
  }

  const updateExamName = async (event, exam_id) => {
    
    let id = exam_id
    let exam_name = event.target.value

    try {
      await axios.put(`http://localhost:4000/exams/${id}/${exam_name}`)
    }
    catch(exception) {
      throw exception
    }
    
    setSideEffect(sideEffect + 1)
  }

  const deleteExam = async (exam_index) => {
    
    try {
      await axios.delete(`http://localhost:4000/exams/${examNames[exam_index]}`)
    }
    catch(exception) {
      throw exception
    }

    setSideEffect(sideEffect + 1)
  }

  const addQuestion = async (exam_id) => {
    let id = uuid()
    let question_name = "Insert question title..."

    try {
      await axios.post(`http://localhost:4000/questions/${id}/${question_name}/${exam_id}`)
    }
    catch(exception) {
      throw exception
    }

    setSideEffect(sideEffect + 1)
  }

  const updateListOfQuestions = (list_of_questions) => {
    setListOfQuestions(list_of_questions)
  }

  const triggerSideEffect = (side_effect) => {
    setSideEffect(side_effect)
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

  const initializeExamData = async () => {
    try {
      
      let json_exams = await axios.get("http://localhost:4000/exams/")
      let json_questions = await axios.get("http://localhost:4000/questions/")
      let json_answers = await axios.get("http://localhost:4000/answers/")

      let exams_set = json_exams.data
      let questions_set = json_questions.data
      let answers_set = json_answers.data
      
      //Otetaan tenttien nimet talteen -> tenttinappien nimet
      //Otetaan tenttien id.t talteen -> listOfExamIDs
      let exam_list = []
      let listOfExamIDsCopy = []
      let exam_names_list = []

      for(let exam_iterator = 0; exam_iterator < exams_set.length; exam_iterator++) {
        exam_names_list.push(Object.values(exams_set[exam_iterator]).[1])
        listOfExamIDsCopy.push(exams_set[exam_iterator].id)
        exam_list.push(new Array())
      }

      //Muotoillaan questions_set yksiulotteisesta taulukosta kaksiulotteiseksi täsmäämään exam_listin rakennetta.
      let questions_set_copy = []

      for(let exam_iterator = 0; exam_iterator < exams_set.length; exam_iterator++) {

        questions_set_copy.push(new Array())

        for(let question_iterator = 0; question_iterator < questions_set.length; question_iterator++) {
          
          if(questions_set[question_iterator].exam_id == listOfExamIDsCopy[exam_iterator]) {

            questions_set_copy[exam_iterator].push(questions_set[question_iterator])

          }
        }
      }

      let questions_set_final = questions_set_copy
      
      //Muotoillaan answers_set yksiulotteisesta taulukosta kaksiulotteiseksi täsmäämään exam_listin rakennetta.
      let answers_set_copy = []

      for(let exam_iterator = 0; exam_iterator < exams_set.length; exam_iterator++) {

        answers_set_copy.push(new Array())
        
        for(let question_iterator = 0; question_iterator < questions_set_final.flat(1).length; question_iterator++) {
          
          if(questions_set_final[exam_iterator].[question_iterator] != undefined && (questions_set_final[exam_iterator].[question_iterator].exam_id == listOfExamIDsCopy[exam_iterator])) {

            answers_set_copy[exam_iterator].push(new Array())

            for(let answer_iterator = 0; answer_iterator < answers_set.length; answer_iterator++) {

              if(answers_set[answer_iterator].question_id == questions_set_final[exam_iterator].[question_iterator].id) {

                answers_set_copy[exam_iterator].[question_iterator].push(answers_set[answer_iterator])

              }
            }
          }
        }
      }
      
      let answers_set_final = answers_set_copy

      //Parsitaan kasaan listOfQuestions-tila, jonka datalla renderöidään käyttöliittymä.
      //Otetaan kysymysten id.t talteen -> listOfQuestionIDs
      let listOfQuestionIDsCopy = []
      let listOfAnswerIDsCopy = []
      let question_names_list = []
      let answer_names_list = []

      for(let exam_iterator = 0; exam_iterator < exam_list.length; exam_iterator++) {

        listOfQuestionIDsCopy.push(new Array())
        question_names_list.push(new Array())

        listOfAnswerIDsCopy.push(new Array())
        answer_names_list.push(new Array())
        
        for(let question_iterator = 0; question_iterator < questions_set_final.flat(1).length; question_iterator++) {

          if(questions_set_final[exam_iterator].[question_iterator] != undefined && (questions_set_final[exam_iterator].[question_iterator].exam_id == listOfExamIDsCopy[exam_iterator])) {

            listOfQuestionIDsCopy[exam_iterator].push(questions_set_final[exam_iterator].[question_iterator].id)
            question_names_list[exam_iterator].push(questions_set_final[exam_iterator].[question_iterator].question)

            listOfAnswerIDsCopy[exam_iterator].push(new Array())
            answer_names_list[exam_iterator].push(new Array())

            var object = new Object()
            object.question = questions_set_final[exam_iterator].[question_iterator].question
          
            for(let answer_iterator = 0; answer_iterator < answers_set_final.flat(2).length; answer_iterator++) {

              if(answers_set_final[exam_iterator].[question_iterator].[answer_iterator] != undefined && (answers_set_final[exam_iterator].[question_iterator].[answer_iterator].question_id == listOfQuestionIDsCopy[exam_iterator].[question_iterator])) {

                listOfAnswerIDsCopy[exam_iterator].[question_iterator].push(answers_set_final[exam_iterator].[question_iterator].[answer_iterator].id)
                answer_names_list[exam_iterator].[question_iterator].push(answers_set_final[exam_iterator].[question_iterator].[answer_iterator].answer)

                object["answer" + (answer_iterator+1)] = { answer: answers_set_final[exam_iterator].[question_iterator].[answer_iterator].answer, 
                                                           user_choice: answers_set_final[exam_iterator].[question_iterator].[answer_iterator].user_choice,
                                                           correctness: answers_set_final[exam_iterator].[question_iterator].[answer_iterator].correctness
                                                         }

              }
            }

            exam_list[exam_iterator].push(object)
          }
        }
      }

      setListOfQuestions(exam_list)
      setExamNames(exam_names_list)
      setQuestionNames(question_names_list)
      setAnswerNames(answer_names_list)
      setListOfExamIDs(listOfExamIDsCopy)
      setListOfQuestionIDs(listOfQuestionIDsCopy)
      setListOfAnswerIDs(listOfAnswerIDsCopy)
    
    }
    catch (exception) {
      throw (exception)
    }
  }

  useEffect(() => {

    initializeExamData()
    
  }, [])

  useEffect(() => {

    initializeExamData()

  }, [sideEffect])

  //JSX
  return (
    <div>
      { isLogin
        ?
          <div>
            {<OpenLogin/>}
          </div>
        :
          <div>
            <div className="banner">
              <Button id="tentit_button">TENTIT</Button>
              <Button id="tietoaSovelluksesta_button" href="https://www.youtube.com/watch?v=sAqnNWUD79Q">TIETOA SOVELLUKSESTA</Button>
              <Button id="admin_button" onClick={() => {setMenuChoice("admin");setIsSwappingView(true)}}>ADMIN</Button>
              {examScore}
              <Button id="poistu_button">POISTU</Button>
            </div>
            <div className="exams_menu">
              {generateMenuButtons(listOfQuestions, examNames)}
            </div>
            <div id="selma_div">
              {showSelma()}
            </div>
            <div>
              {generateView(menuChoice)}
            </div>
          </div>
      }
    </div>
  )
}

export default App;
