import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import Checkbox from '@material-ui/core/Checkbox'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import './Question.css'

const AdminQuestion = (props) => {

    //FUNCTIONS

    const generateAdminQuestionContent = (question) => {
        let question_content = []

        question_content.push(<div id="admin_question_textfield_div">
                              <TextField 
                                variant="outlined"
                                id="admin_question_textfield"
                                size="small" 
                                style={{width: 750}}
                                type="text"
                                placeholder={question.question}
                                onBlur={(event) => {updateQuestionText(event, props.listOfQuestionIDs, props.exam_index, props.question_index)}}
                                />
                              <DeleteIcon 
                                id="delete_icon"
                                onClick={() => {deleteQuestion(props.listOfQuestionIDs, props.questionNames, props.exam_index, props.question_index)}}
                              />
                              </div>)

        for(let answer_iterator = 1; answer_iterator < Object.values(question).length; answer_iterator++) {
            if(Object.values(props.listOfQuestions[props.exam_index].[props.question_index]).[answer_iterator].correctness == true) {

                question_content.push(<div id="admin_answer_textfield_div">
                    <Checkbox checked='true' onClick={(event) => {setAnswerCorrectness(event, props.listOfAnswerIDs, props.listOfQuestionIDs, props.exam_index, props.question_index, answer_iterator-1)}}/>
                    <TextField 
                        variant="outlined"
                        size="small" 
                        style={{width: 650}}
                        type="text"
                        placeholder={Object.values(question).[answer_iterator].answer}
                        onBlur={(event) => {updateAnswerText(event, props.listOfAnswerIDs, props.exam_index, props.question_index, answer_iterator-1)}}
                        />
                    <DeleteIcon 
                        id="delete_icon"
                        onClick={() => {deleteAnswer(props.answerNames, props.exam_index, props.question_index, answer_iterator-1)}}
                        />
                    </div>)
            }
            else {
                question_content.push(<div id="admin_answer_textfield_div">
                    <Checkbox onClick={(event) => {setAnswerCorrectness(event, props.listOfAnswerIDs, props.listOfQuestionIDs, props.exam_index, props.question_index, answer_iterator-1)}}/>
                    <TextField 
                        variant="outlined" 
                        size="small" 
                        style={{width: 650}}
                        type="text" 
                        placeholder={Object.values(question).[answer_iterator].answer}
                        onBlur={(event) => {updateAnswerText(event, props.listOfAnswerIDs, props.exam_index, props.question_index, answer_iterator-1)}}
                    />
                    <DeleteIcon 
                        id="delete_icon"
                        onClick={() => {deleteAnswer(props.answerNames, props.exam_index, props.question_index, answer_iterator-1)}}
                    />
                    </div>)
            }
        }

        question_content.push(<AddCircleIcon id="add_answer_icon" onClick={() => {addAnswer(props.listOfQuestionIDs[props.exam_index].[props.question_index])}}/>)
        return question_content
    }

    

    const updateQuestionText = async (event, list_of_question_IDs, exam_index, question_index) => {

        let id = list_of_question_IDs[exam_index].[question_index]

        try {
            await axios.put(`http://localhost:4000/questions/${id}/${event.target.value}`)
        }
        catch(exception) {
            throw exception
        }

        props.triggerSideEffect(props.sideEffect + 1)
    }

    const deleteQuestion = async (list_of_question_IDs, question_names, exam_index, question_index) => {

        let question = question_names[exam_index].[question_index]

        try {
            await axios.delete(`http://localhost:4000/questions/${question}`)
        }
        catch(exception) {
            throw exception
        }
        props.triggerSideEffect(props.sideEffect + 1)
    }

    const addAnswer = async (question_id) => {
        let id = uuid()
        let answer_name = "Insert answer..."
        let user_choice = false
        let correctness = false

        try {
            let result = await axios.post(`http://localhost:4000/answers/${id}/${answer_name}/${user_choice}/${correctness}/${question_id}`)
            console.log(result)
        }
        catch(exception) {
            throw exception
        }

        props.triggerSideEffect(props.sideEffect + 1)
    }

    const updateAnswerText = async (event, list_of_answer_IDs, exam_index, question_index, answer_index) => {

        let id = list_of_answer_IDs[exam_index].[question_index].[answer_index]

        try {
            await axios.put(`http://localhost:4000/answers/${id}/${event.target.value}`)
        }
        catch(exception) {
            throw exception
        }
        props.triggerSideEffect(props.sideEffect + 1)
    }

    const deleteAnswer = async (answer_names, exam_index, question_index, answer_index) => {

        let answer = answer_names[exam_index].[question_index].[answer_index]

        try {
            await axios.delete(`http://localhost:4000/answers/${answer}`)
        }
        catch(exception) {
            throw exception
        }

        props.triggerSideEffect(props.sideEffect + 1)
    }

    const setAnswerCorrectness = async (event, answer_id, question_id, exam_index, question_index, answer_index) => {

        let id = answer_id[exam_index].[question_index].[answer_index]
        let correctness = event.target.checked
        let questionID = question_id[exam_index].[question_index]
        console.log(questionID)

        try {
            await axios.put(`http://localhost:4000/answers/${id}/${correctness}/${questionID}`)
        }
        catch(exception) {
            throw exception
        }

        props.triggerSideEffect(props.sideEffect + 1)
    }

    //JSX
    return (

        <div>
            <Paper id="admin_question_paper">
                {generateAdminQuestionContent(props.question)}
            </Paper>
        </div>

    )
}

export default AdminQuestion
