import React, {useState} from 'react'
import uuid from 'react-uuid'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//JÄÄTIIN YRITYKSEEN SAADA POST TOIMIIN. HUUTAA 404.ää. TARKASTA USER SYNTAKSI REGISTER FUNKTIOSSA.. KYSEENALAINEN..

export default function OpenLogin() {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {

    let id = uuid()
    let user = `${firstname}+' '+${lastname}`
    let register_time = Date.now()
    let is_admin = false

    try {
      let result = await axios.post(`http://localhost:4000/${id}/${user}/${email}/${password}/${register_time}/${is_admin}`)
      console.log(result)
    }
    catch(exception) {
      throw exception
    }

  }
  
  return (
    <div>
      <div id="login_div">
        <Paper id="login_pane">
          <div id="login_pane_text_div">
            <span id="login_text">Hello, user!<br></br></span>
            <span id="login_text">Before taking an exam, create an account first.<br></br></span>
            <span id="login_text">If you do have an account already, please sign in.</span>
          </div>
          <div id="login_pane_component_div">
            <fieldset>
              <legend>Register:</legend>
                <TextField 
                  variant="outlined" 
                  label="Enter firstname" 
                  size="small" 
                  style={{width: 650}} 
                  placeholder="Enter firstname..."
                  onBlur={(event) => {setFirstname(event.target.value)}}
                ></TextField>
                <TextField 
                  variant="outlined" 
                  label="Enter lastname" 
                  size="small" 
                  style={{width: 650}} 
                  placeholder="Enter lastname..."
                  onBlur={(event) => {setLastname(event.target.value)}}
                ></TextField>
                <TextField 
                  variant="outlined" 
                  label="Enter e-mail" 
                  size="small" 
                  style={{width: 650}} 
                  placeholder="Enter an email address..."
                  onBlur={(event) => {setEmail(event.target.value)}}
                  ></TextField>
                <TextField 
                  variant="outlined" 
                  label="Enter password" 
                  size="small" 
                  style={{width: 650}} 
                  placeholder="Enter password..."
                  onBlur={(event) => {setPassword(event.target.value)}}
                  ></TextField>
            </fieldset>
              <Button id="button" onClick={() => {register()}}>Register</Button>
            <fieldset>
              <legend>Login:</legend>
                <TextField variant="outlined" label="E-mail" size="small" style={{width: 650}} placeholder="Enter an email address..."></TextField>
                <TextField variant="outlined" label="Password" size="small" style={{width: 650}} placeholder="Enter password..."></TextField>
            </fieldset>
              <Button id="button">Login</Button>
          </div>
        </Paper>
      </div>
    </div>
  );

}