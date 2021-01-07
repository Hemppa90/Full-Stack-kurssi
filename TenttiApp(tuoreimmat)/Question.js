import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'

import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import './Question.css'

const Question = (props) => {

    //FUNCTIONS

    const generateQuestionContent = (questions) => {
        let list = []
        
        //Työnnä listaan kysymys
        list.push(<div id="question_text">{questions[props.exam_index].[props.question_index].question}</div>)

        //Jos ei näytetä oikeita vastauksia, niin...
        if(props.answers != true) {
            for(let property_index = 1; property_index < Object.values(questions[props.exam_index].[props.question_index]).length; property_index++) {

                //Työnnä listaan vastaus, jossa käyttäjä merkannut checkboxin.
                if(Object.values(questions[props.exam_index].[props.question_index])[property_index].user_choice == true) {
                    list.push(<div id="answer_textfield">
                                <Checkbox 
                                checked='true' 
                                onClick={(event) => checkboxChecked(event, property_index-1, questions, props.listOfAnswerIDs, props.listOfQuestionIDs, props.answerNames, props.exam_index, props.question_index)}
                                />
                                {Object.values(questions[props.exam_index].[props.question_index])[property_index].answer}
                              </div>)
                }
                //Työnnä listaan vastaus, jossa checkbox merkkaamatta.
                else {
                    list.push(<div id="answer_textfield">
                                <Checkbox 
                                onClick={(event) => checkboxChecked(event, property_index-1, questions, props.listOfAnswerIDs, props.listOfQuestionIDs, props.answerNames, props.exam_index, props.question_index)}
                                />
                                {Object.values(questions[props.exam_index].[props.question_index])[property_index].answer}
                              </div>)
                }
            }
        }
        //Jos näytetään oikeat vastaukset, niin...
        else {
            for(let property_index = 1; property_index < Object.values(questions[props.exam_index].[props.question_index]).length; property_index++) {

                if(Object.values(questions[props.exam_index].[props.question_index])[property_index].correctness == true && Object.values(questions[props.exam_index].[props.question_index])[property_index].user_choice == true) {
                    list.push(<div id="answer_textfield">
                                <Checkbox 
                                disabled='true'
                                checked='true'
                                />
                                <Checkbox 
                                checked='true'
                                />
                                {Object.values(questions[props.exam_index].[props.question_index])[property_index].answer}
                                <CheckCircleOutlineIcon id="correct_icon"/>
                              </div>)
                }
                else if(Object.values(questions[props.exam_index].[props.question_index])[property_index].correctness == false && Object.values(questions[props.exam_index].[props.question_index])[property_index].user_choice == true) {
                    list.push(<div id="answer_textfield">
                                <Checkbox 
                                disabled='true' 
                                checked='true'
                                /><Checkbox />
                                {Object.values(questions[props.exam_index].[props.question_index])[property_index].answer}
                              </div>)
                }
                else if(Object.values(questions[props.exam_index].[props.question_index])[property_index].correctness == true) {
                    list.push(<div id="answer_textfield">
                                <Checkbox 
                                disabled='true'
                                />
                                <Checkbox 
                                checked='true'
                                />
                                {Object.values(questions[props.exam_index].[props.question_index])[property_index].answer}
                              </div>)
                }
                else {
                    list.push(<div id="answer_textfield">
                                <Checkbox 
                                disabled='true'
                                />
                                <Checkbox 
                                disabled='true'
                                />
                                {Object.values(questions[props.exam_index].[props.question_index])[property_index].answer}
                              </div>)
                }
            }
        }

        return list
    }

    const checkboxChecked = async (event, property_index, questions, answer_id, question_id, answer_names, exam_index, question_index) => {

        let id = answer_id[exam_index].[question_index].[property_index]
        let answer = answer_names[exam_index].[question_index].[property_index]
        let user_choice = event.target.checked
        let questionID = question_id[exam_index].[question_index]

        try {
            await axios.put(`http://localhost:4000/answers/${id}/${answer}/${user_choice}/${questionID}`)
        }
        catch(exception) {
            throw exception
        }

        props.triggerSideEffect(props.sideEffect + 1)

        let list_of_questions_copy = JSON.parse(JSON.stringify(questions))

        if(Object.values(list_of_questions_copy[props.exam_index].[props.question_index]).[property_index+1].user_choice == true &&
           Object.values(list_of_questions_copy[props.exam_index].[props.question_index]).[property_index+1].correctness == true ) {

            props.subtractFromExamScore()
            
        }
        else if(Object.values(list_of_questions_copy[props.exam_index].[props.question_index]).[property_index+1].user_choice == false &&
                Object.values(list_of_questions_copy[props.exam_index].[props.question_index]).[property_index+1].correctness == true) {

            props.addToExamScore()
            
        }
    }

    //JSX
    return(
        <div>
            <Paper id="question_paper">
                {generateQuestionContent(props.questions)}
            </Paper>
        </div>
    )
}

export default Question
